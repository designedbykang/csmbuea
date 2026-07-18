"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { Clock, ShoppingBag } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    supabase.from("products").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading products...</div>;

  return (
    <div className="bg-[#efeae2] dark:bg-[#0b141a] min-h-full p-4 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Shop</h1>
      <div className="flex flex-col max-w-2xl mx-auto gap-3">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">No products available. Check back soon!</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 bg-white dark:bg-[#1f2a30] rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-transparent hover:border-brand-red/20 dark:hover:border-brand-yellow/20">
              <div className="relative w-16 h-16 shrink-0 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <Image src={p.image_url} alt={p.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${p.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{p.title}</h3>
                  <p className="text-sm text-brand-red dark:text-brand-yellow font-medium">{p.price.toLocaleString()} XAF</p>
                  {p.description && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{p.description}</p>}
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1"><Clock size={12} /> Just now</p>
                </Link>
              </div>
              <button
                onClick={() => addToCart(p)}
                className="p-2 bg-brand-red text-white rounded-full hover:bg-[#7a0a14] transition-colors shrink-0 shadow-md"
              >
                <ShoppingBag size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
