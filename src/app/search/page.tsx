"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) { setLoading(false); return; }
    supabase.from("products").select("*").ilike("title", `%${query}%`).order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="min-h-full bg-white dark:bg-[#0b141a] p-4">
      <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-4 hover:text-brand-red dark:hover:text-brand-yellow">
        <ArrowLeft size={20} className="mr-2" /> Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Search Results for &quot;{query}&quot;</h1>
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">Searching...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700">
                <Image src={p.image_url} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{p.title}</h3>
                <p className="text-sm font-medium text-brand-red dark:text-brand-yellow mt-1">{p.price.toLocaleString()} XAF</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
