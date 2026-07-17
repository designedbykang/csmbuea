"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (isMounted) {
          setProducts(data || []);
          localStorage.setItem("csmbuea_products_cache", JSON.stringify(data || []));
          setLoading(false);
        }
      } catch (err) {
        console.warn("Network failed, trying cache...");
        const cached = localStorage.getItem("csmbuea_products_cache");
        if (cached) {
          setProducts(JSON.parse(cached));
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading products...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 p-4 text-center">Could not connect to the server.</div>;

  return (
    <div className="min-h-screen bg-brand-bg p-4 pb-24">
      {/* Just a clean page title, no rogue header */}
      <h1 className="text-2xl font-bold text-brand-black mb-6">Our Products</h1>
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 mt-10">No products available yet.</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative w-full aspect-square bg-gray-100">
                <Image src={p.image_url} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.price.toLocaleString()} XAF</p>
                {p.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>}
                <button 
                  onClick={() => addToCart(p)}
                  className="mt-3 w-full bg-brand-red text-white py-1.5 rounded-full text-sm font-medium hover:bg-[#7a0a14] active:scale-95 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}