"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";
import { uploadProduct } from "@/app/admin/upload/actions";
import { useRouter } from "next/navigation";

interface Props {
  file: File;
  onClose: () => void;
}

export function ProductPreviewModal({ file, onClose }: Props) {
  const [step, setStep] = useState(0); // 0: Title, 1: Price, 2: Desc
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const previewUrl = URL.createObjectURL(file);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleAdvance = async () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await uploadProduct(formData);
      router.push("/admin/products");
    } catch (error) {
      alert("Failed to post product. Check console.");
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = () => {
    if (step === 0) return "Add a product title...";
    if (step === 1) return "Set price (XAF)...";
    return "Add a description (optional)...";
  };

  const getValue = () => {
    if (step === 0) return title;
    if (step === 1) return price;
    return description;
  };

  const setValue = (val: string) => {
    if (step === 0) setTitle(val);
    else if (step === 1) setPrice(val);
    else setDescription(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <button onClick={onClose} className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white z-10 hover:bg-black/70">
        <X size={28} />
      </button>
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <div className="relative w-full max-w-md h-full max-h-[70vh] flex items-center justify-center">
          <Image src={previewUrl} alt="Preview" fill className="object-contain" />
        </div>
      </div>

      {step < 3 && !isSubmitting && (
        <div className="absolute bottom-12 left-4 right-4 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={getPlaceholder()}
            value={getValue()}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdvance(); }}
            className="flex-1 bg-[#2d2d2d] rounded-full px-4 py-3 text-white text-base focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-gray-500"
          />
        </div>
      )}

      {step === 3 && !isSubmitting && (
        <div className="absolute bottom-6 right-4">
          <button onClick={handleAdvance} className="p-4 bg-green-500 rounded-full text-white shadow-lg hover:scale-105 transition-transform">
            <Send size={24} />
          </button>
        </div>
      )}
    </div>
  );
}