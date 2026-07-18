"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  if (items.length === 0) return (
    <div className="min-h-full flex flex-col items-center justify-center bg-white dark:bg-[#0b141a] p-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Your bag is empty</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Add some products from the store!</p>
      <Link href="/products" className="bg-brand-red text-white px-6 py-2 rounded-full">Browse Store</Link>
    </div>
  );
  return (
    <div className="min-h-full bg-white dark:bg-[#0b141a] p-4 relative">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Bag</h1>
      <div className="space-y-4 pb-32">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl">
            <div className="relative w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
              <Image src={item.image_url} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div><h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{item.title}</h3><p className="text-sm text-gray-600 dark:text-gray-300">{item.price.toLocaleString()} XAF</p></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded-full px-2 py-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><Minus size={14} /></button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1f2a30] border-t p-4 shadow-lg z-50"><div className="flex justify-between items-center mb-4"><span className="font-semibold text-gray-800 dark:text-gray-100">Total</span><span className="font-bold text-xl text-gray-900 dark:text-gray-100">{total.toLocaleString()} XAF</span></div><Link href="/checkout" className="block w-full bg-brand-red text-white text-center py-3 rounded-full font-semibold text-lg hover:bg-[#7a0a14] transition-colors">Continue →</Link></div>
    </div>
  );
}
