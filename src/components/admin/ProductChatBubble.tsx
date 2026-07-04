"use client";

import Image from "next/image";

interface Props {
  imageUrl: string;
  title: string;
  price: number;
  description?: string;
  createdAt: string;
}

export function ProductChatBubble({ imageUrl, title, price, description, createdAt }: Props) {
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
            <svg viewBox="0 0 18 18" className="w-3 h-3 fill-current">
              <path d="M17.4 4.4L9.6 12.2 5.9 8.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.7 4.4L6.9 11.2 4.1 8.4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}