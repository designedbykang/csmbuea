"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Plus, X, Send, Package, LogOut, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductBubbleProps {
  imageUrl: string;
  title: string;
  price: number;
  description?: string;
  createdAt: string;
  onDelete: () => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

function ProductChatBubble({ imageUrl, title, price, description, createdAt, onDelete, isMenuOpen, toggleMenu }: ProductBubbleProps) {
  return (
    <div className="flex flex-col items-end mb-4 relative group">
      <div className="max-w-[85%] bg-[#dcf8c6] rounded-2xl rounded-tr-sm p-2 shadow-sm relative">
        <button onClick={toggleMenu} className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-sm z-20 border border-gray-100 text-gray-500 hover:text-gray-800 transition-colors">
          <MoreVertical size={16} />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 top-6 bg-white rounded-lg shadow-xl border border-gray-100 z-30 w-28 overflow-hidden">
            <button onClick={() => { if (confirm("Are you sure you want to delete this product?")) { onDelete(); } toggleMenu(); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
              Delete
            </button>
          </div>
        )}
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

interface ModalProps {
  file: File;
  onClose: () => void;
  onPost: (title: string, price: number, desc: string, file: File) => Promise<void>;
}

function ProductPreviewModal({ file, onClose, onPost }: ModalProps) {
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
      <button onClick={onClose} className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white z-10"><X size={28} /></button>
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <Image src={previewUrl} alt="Preview" fill className="object-contain" />
      </div>
      {step < 3 && !submitting && (
        <div className="absolute bottom-12 left-4 right-4 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={step === 0 ? "Title" : step === 1 ? "Price (XAF)" : "Description"}
            value={step === 0 ? title : step === 1 ? price : desc}
            onChange={(e) => { if (step === 0) setTitle(e.target.value); else if (step === 1) setPrice(e.target.value); else setDesc(e.target.value); }}
            onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }}
            className="flex-1 bg-[#2d2d2d] rounded-full px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-gray-500"
          />
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

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) {
      supabase.from("products").select("*").order("created_at", { ascending: true }).then(({ data }) => {
        if (data) setProducts(data);
      });
    }
  }, [session]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  if (!session) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="bg-white p-8 rounded-xl shadow-md"><h1 className="text-xl font-bold mb-4">Admin Login</h1><p className="text-gray-600">Please log in via the login page.</p></div></div>;
  }

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
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: true });
    if (data) setProducts(data);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Failed to delete: " + error.message);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
    setOpenMenuId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadFile(file);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-[#efeae2] p-4 pb-24 relative">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#efeae2] py-2 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Products</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/orders" className="bg-white text-[#2B6CB0] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <Package size={16} /> Orders
          </Link>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-1">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />

      <div className="flex flex-col max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No products yet. Tap the + button below to add one!</div>
        ) : (
          products.map((p) => (
            <ProductChatBubble
              key={p.id}
              imageUrl={p.image_url}
              title={p.title}
              price={p.price}
              description={p.description}
              createdAt={new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              onDelete={() => handleDelete(p.id)}
              isMenuOpen={openMenuId === p.id}
              toggleMenu={() => setOpenMenuId((prev) => (prev === p.id ? null : p.id))}
            />
          ))
        )}
      </div>

      <button onClick={() => fileInputRef.current?.click()} className="fixed bottom-24 right-4 bg-brand-red text-white p-4 rounded-full shadow-lg hover:bg-[#1a4a8a] transition-colors z-40">
        <Plus size={28} />
      </button>

      {uploadFile && <ProductPreviewModal file={uploadFile} onClose={() => setUploadFile(null)} onPost={handlePost} />}
    </div>
  );
}
