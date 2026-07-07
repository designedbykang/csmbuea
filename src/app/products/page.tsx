"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">CSM Buea</h1>
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 mt-10">
            No products available yet. Check back soon!
          </div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative w-full aspect-square bg-gray-100">
                <Image
                  src={p.image_url}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.price.toLocaleString()} XAF</p>
                {p.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick link back to Admin (optional) */}
      <div className="fixed bottom-4 right-4">
        <Link href="/admin" className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm shadow-lg">
          Admin
        </Link>
      </div>
    </div>
  );
}