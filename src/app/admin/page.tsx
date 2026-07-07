"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Plus, X, Send, Package } from "lucide-react";
import Link from "next/link";

function ProductChatBubble({ imageUrl, title, price, description, createdAt }) {
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

function ProductPreviewModal({ file, onClose, onPost }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  const previewUrl = URL.createObjectURL(file);

  useEffect(() => {
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else setStep(3);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const priceNumber = Number(price) || 0;
    await onPost(title, priceNumber, desc, file);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <button onClick={onClose} className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white z-10 hover:bg-black/70 transition-colors">
        <X size={28} />
      </button>

      <div className="flex-1 relative bg-black flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-md h-full max-h-[60vh] flex items-center justify-center">
          <Image src={previewUrl} alt="Preview" fill className="object-contain" />
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-t-3xl p-6 pb-10 shadow-2xl flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          {step === 0 && !submitting && (
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">Product Title</label>
              <div className="flex items-center bg-[#2d2d2d] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#2B6CB0]">
                <input ref={inputRef} type="text" placeholder="e.g. Hisense 50\" QLED TV" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }} className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-500 text-lg" />
              </div>
            </div>
          )}
          {step === 1 && !submitting && (
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">Price</label>
              <div className="flex items-center bg-[#2d2d2d] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#2B6CB0]">
                <span className="text-gray-400 mr-2 font-bold">XAF</span>
                <input ref={inputRef} type="number" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }} className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-500 text-lg" />
              </div>
            </div>
          )}
          {step === 2 && !submitting && (
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">Description (Optional)</label>
              <div className="flex items-center bg-[#2d2d2d] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#2B6CB0]">
                <input ref={inputRef} type="text" placeholder="Highlight the best features..." value={desc} onChange={(e) => setDesc(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }} className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-500 text-lg" />
              </div>
            </div>
          )}
          {step < 3 && !submitting && <div className="flex justify-end text-xs text-gray-500 mt-2">Press Enter to continue...</div>}
        </div>

        {step === 3 && !submitting && (
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <p className="text-green-500 font-medium text-lg">Ready to post!</p>
            <button onClick={handleSubmit} className="p-4 bg-green-500 rounded-full text-white shadow-lg hover:scale-105 transition-transform">
              <Send size={24} />
            </button>
          </div>
        )}

        {submitting && <div className="text-center text-gray-500 py-6">Submitting...</div>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const fileInputRef = useRef(null);

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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="bg-white p-8 rounded-xl shadow-md"><h1 className="text-xl font-bold mb-4">Admin Login</h1><p className="text-gray-600">Please log in via the login page.</p></div></div>;
  }

  const handlePost = async (title, price, desc, file) => {
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

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-[#efeae2] p-4 pb-24 relative">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#efeae2] py-2 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Products</h1>
        <Link href="/admin/orders" className="bg-white text-[#2B6CB0] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
          <Package size={16} />
          Orders
        </Link>
      </div>

      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />

      <div className="flex flex-col max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No products yet. Tap the + button below to add one!</div>
        ) : (
          products.map((p) => (
            <ProductChatBubble key={p.id} imageUrl={p.image_url} title={p.title} price={p.price} description={p.description} createdAt={new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
          ))
        )}
      </div>

      <button onClick={() => fileInputRef.current?.click()} className="fixed bottom-24 right-4 bg-[#2B6CB0] text-white p-4 rounded-full shadow-lg hover:bg-[#1a4a8a] transition-colors z-40">
        <Plus size={28} />
      </button>

      {uploadFile && <ProductPreviewModal file={uploadFile} onClose={() => setUploadFile(null)} onPost={handlePost} />}
    </div>
  );
}