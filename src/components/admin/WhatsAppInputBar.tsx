"use client";

import { useRef } from "react";
import { Plus, Paperclip, Camera, Mic } from "lucide-react";

interface Props {
  onGalleryPick: (file: File) => void;
  onCameraPick: (file: File) => void;
}

export function WhatsAppInputBar({ onGalleryPick, onCameraPick }: Props) {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "gallery" | "camera") => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "gallery") onGalleryPick(file);
      else onCameraPick(file);
    }
    e.target.value = "";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f0f0f0] p-3 flex items-center gap-3 border-t border-gray-300 safe-area-bottom">
      <input type="file" accept="image/*" ref={galleryInputRef} className="hidden" onChange={(e) => handleFileChange(e, "gallery")} />
      <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} className="hidden" onChange={(e) => handleFileChange(e, "camera")} />

      <button className="text-2xl text-black p-2 hover:bg-gray-200 rounded-full transition">
        <Plus size={24} />
      </button>
      <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400 shadow-inner">
        Upload a product...
      </div>
      <button onClick={() => galleryInputRef.current?.click()} className="text-gray-700 p-2 hover:bg-gray-200 rounded-full transition">
        <Paperclip size={22} />
      </button>
      <button onClick={() => cameraInputRef.current?.click()} className="text-gray-700 p-2 hover:bg-gray-200 rounded-full transition">
        <Camera size={22} />
      </button>
      <button className="text-gray-400 p-2 hover:bg-gray-200 rounded-full transition">
        <Mic size={22} />
      </button>
    </div>
  );
}