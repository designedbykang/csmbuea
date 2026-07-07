"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Plus, Paperclip, Camera, Mic, X, Send } from "lucide-react";

// ---------- WhatsApp-style Input Bar ----------
function WhatsAppInputBar({ onGalleryPick, onCameraPick }: { onGalleryPick: (f: File) => void; onCameraPick: (f: File) => void }) {
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f0f0f0] p-3 flex items-center gap-3 border-t border-gray-300">
      <input type="file" accept="image/*" ref={galleryRef} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onGalleryPick(f); }} />
      <input type="file" accept="image/*" capture="environment" ref={cameraRef} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onCameraPick(f); }} />
      <button className="text-2xl text-black p-2"><Plus size={24} /></button>
      <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400 shadow-inner">Upload a product...</div>
      <button onClick={() => galleryRef.current?.click()} className="text-gray-700 p-2"><Paperclip size={22} /></button>
      <button onClick={() => cameraRef.current?.click()} className="text-gray-700 p-2"><Camera size={22} /></button>
      <button className="text-gray-400 p-2"><Mic size={22} /></button>
    </div>
  );
}

// ---------- Product Bubble (like WhatsApp message) ----------
function ProductChatBubble({ imageUrl, title, price, description, createdAt }: { imageUrl: string; title: string; price: number; description?: string; createdAt: string }) {
  return (
    <div className="flex flex-col items-end mb-4">
      <div className="max-w-[85%] bg-[#dcf8c6] rounded-2xl rounded-tr-sm p-2 shadow-sm">
        <div className="relative w-full aspect-square max-h-[300px] rounded-lg overflow-hidden bg-gray-200">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="mt-2 px-1">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-gray-900 text-base leading-tight">{title}</h3>
            <span className="text-sm font-semibold text-gray-700 ml-2">{price.toLocaleString()} XAF</span>
          </div>
          {description && <p className="text-gray-700 text-sm mt-1 leading-snug">{description}</p>}
        </div>
        <div className="flex justify-end items-center gap-1 mt-1 pr-1">
          <span className="text-[10px] text-gray-500">{createdAt}</span>
          <div className="text-[10px] text-gray-500 flex items-center">
            <svg viewBox="0 0 18 18" className="w-3 h-3 fill-current"><path d="M17.4 4.4L9.6 12.2 5.9 8.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.7 4.4L6.9 11.2 4.1 8.4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Preview Modal (step‑by‑step input) ----------
function ProductPreviewModal({ file, onClose, onPost }: { file: File; onClose: () => void; onPost: (title: string, price: number, desc: string, file: File) => Promise<void> }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = URL.createObjectURL(file);
  useEffect(() => { return () => URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [step]);

  const handleNext = () => { if (step < 2) setStep(step + 1); else setStep(3); };
  const handleSubmit = async () => {
    setSubmitting(true);
    const priceNumber = Number(price) || 0;
    await onPost(title, priceNumber, desc, file);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <button onClick={onClose} className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white"><X size={28} /></button>
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <Image src={previewUrl} alt="Preview" fill className="object-contain" />
      </div>
      {step < 3 && !submitting && (
        <div className="absolute bottom-12 left-4 right-4">
          <input ref={inputRef} type="text" placeholder={step === 0 ? "Title" : step === 1 ? "Price (XAF)" : "Description"} value={step === 0 ? title : step === 1 ? price : desc} onChange={(e) => { if (step === 0) setTitle(e.target.value); else if (step === 1) setPrice(e.target.value); else setDesc(e.target.value); }} onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }} className="w-full bg-[#2d2d2d] rounded-full px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500" />
        </div>
      )}
      {step === 3 && !submitting && (
        <div className="absolute bottom-6 right-4">
          <button onClick={handleSubmit} className="p-4 bg-green-500 rounded-full text-white shadow-lg"><Send size={24} /></button>
        </div>
      )}
    </div>
  );
}

// ---------- Main Admin Page ----------
export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) {
      supabase.from("products").select("*").order("created_at", { ascending: false }).then(({ data }) => {
        if (data) setProducts(data);
      });
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setLoginError(error.message);
  };

  const handlePost = async (title: string, price: number, desc: string, file: File) => {
    const fileName = `${Date.now()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(fileName, file);
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);

    const { error: dbError } = await supabase.from("products").insert({
      title,
      price,
      description: desc || null,
      image_url: urlData.publicUrl,
    });
    if (dbError) throw new Error(dbError.message);

    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-80">
          <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Log In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efeae2] p-4 pb-24 relative">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#efeae2] py-2 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Products</h1>
        <button onClick={() => supabase.auth.signOut()} className="text-sm text-red-500 underline">Logout</button>
      </div>

      <div className="flex flex-col max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No products yet. Tap the icons below to add one!</div>
        ) : (
          products.map((p) => (
            <ProductChatBubble
              key={p.id}
              imageUrl={p.image_url}
              title={p.title}
              price={p.price}
              description={p.description}
              createdAt={new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          ))
        )}
      </div>

      {uploadFile && (
        <ProductPreviewModal
          file={uploadFile}
          onClose={() => setUploadFile(null)}
          onPost={handlePost}
        />
      )}

      <WhatsAppInputBar
        onGalleryPick={(f) => setUploadFile(f)}
        onCameraPick={(f) => setUploadFile(f)}
      />
    </div>
  );
}