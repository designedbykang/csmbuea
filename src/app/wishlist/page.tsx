"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";

type WishlistItem = { id: string; title: string; price: number; image_url: string; };

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("csmbuea_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);
  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("csmbuea_wishlist", JSON.stringify(updated));
  };
  return (
    <div className="min-h-full bg-brand-bg dark:bg-[#0b141a] p-4 pb-24">
      <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-4 hover:text-brand-red dark:hover:text-brand-yellow">
        <ArrowLeft size={20} className="mr-2" /> Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="bg-white dark:bg-[#1f2a30] rounded-2xl p-8 text-center shadow-sm">
          <Heart size={48} className="mx-auto text-gray-300 dark:text-gray-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Your wishlist is empty. Start adding items!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col relative">
              <button onClick={() => removeFromWishlist(item.id)} className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors z-10">
                <Heart size={18} fill="currentColor" />
              </button>
              <Link href={`/products/${item.id}`}>
                <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700">
                  <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{item.title}</h3>
                  <p className="text-sm font-medium text-brand-red dark:text-brand-yellow mt-1">{item.price.toLocaleString()} XAF</p>
                </div>
              </Link>
              <div className="px-3 pb-3 pt-0">
                <Link href={`/products/${item.id}`} className="w-full bg-brand-red text-white text-center py-2 rounded-full text-sm font-medium hover:bg-[#7a0a14] transition-colors flex items-center justify-center gap-1">
                  <ShoppingCart size={16} /> Quick Add
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
