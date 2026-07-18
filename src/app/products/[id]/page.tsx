import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error || !product) return <div className="flex items-center justify-center h-full text-red-500 text-center p-6">Product not found.</div>;
  return (
    <div className="min-h-full bg-white dark:bg-[#0b141a] pb-24">
      <div className="sticky top-0 bg-white/80 dark:bg-[#1f2a30]/80 backdrop-blur-sm z-20 p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-4">
        <Link href="/products" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{product.title}</h1>
      </div>
      <div className="p-4 max-w-md mx-auto">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-sm mb-6">
          <Image src={product.image_url} alt={product.title} fill className="object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{product.title}</h1>
        <p className="text-2xl font-bold text-brand-red dark:text-brand-yellow mb-4">{product.price.toLocaleString()} XAF</p>
        {product.description && <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-6">{product.description}</p>}
        <form action={`/api/cart/add`} method="POST">
          <input type="hidden" name="productId" value={product.id} />
          <button type="submit" className="w-full bg-brand-red text-white py-4 rounded-full font-bold hover:bg-[#7a0a14] transition-colors flex items-center justify-center gap-2">
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}
