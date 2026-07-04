"use client";

import { useState } from "react";
import { WhatsAppInputBar } from "@/components/admin/WhatsAppInputBar";
import { ProductPreviewModal } from "@/components/admin/ProductPreviewModal";

export default function AdminUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-[#efeae2] relative">
      {selectedFile && (
        <ProductPreviewModal 
          file={selectedFile} 
          onClose={() => setSelectedFile(null)} 
        />
      )}
      <div className="flex-1 p-4 pt-10 text-center text-gray-500">
        <p>Welcome to the WhatsApp-style product uploader.</p>
        <p className="mt-2 text-sm">Tap the 📷 or 📎 below to start.</p>
      </div>
      <WhatsAppInputBar 
        onGalleryPick={(f) => setSelectedFile(f)} 
        onCameraPick={(f) => setSelectedFile(f)} 
      />
    </div>
  );
}