"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

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
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-10">No products available. Check back soon!</div>
        ) : (
          products.map((p) => (
            <div 
              key={p.id} 
              className="group flex flex-col bg-white dark:bg-[#1f2a30] rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-red/20 dark:hover:border-brand-yellow/20"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-3">
                <Link href={`/products/${p.id}`}>
                  <Image src={p.image_url} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </Link>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 min-w-0">
                <Link href={`/products/${p.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2">{p.title}</h3>
                  <p className="text-sm font-medium text-brand-red dark:text-brand-yellow mt-1">{p.price.toLocaleString()} XAF</p>
                  {p.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{p.description}</p>}
                </Link>
              </div>

              {/* Action Button */}
              <button
                onClick={() => addToCart(p)}
                className="mt-3 w-full bg-brand-red text-white py-2 rounded-full text-sm font-medium hover:bg-[#7a0a14] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
