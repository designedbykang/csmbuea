"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { items, addToCart } = useCart();

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
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 p-4 text-center">Could not connect to the server. Please check your connection and refresh.</div>;

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white p-4 pb-24 relative">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pt-2 pb-2 z-10">
        <h1 className="text-2xl font-bold text-brand-black">CSM Buea</h1>
        <div className="relative p-2 bg-gray-100 rounded-full">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 mt-10">No products available yet. Check back soon!</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative w-full aspect-square bg-gray-100">
                <Image src={p.image_url} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.price.toLocaleString()} XAF</p>
                {p.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>}
                <button 
                  onClick={() => addToCart(p)}
                  className="mt-3 w-full bg-brand-red text-white py-1.5 rounded-full text-sm font-medium hover:bg-[#1a4a8a] active:scale-95 transition-all"
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
