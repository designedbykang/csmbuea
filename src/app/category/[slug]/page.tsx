import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) return <div className="p-6 text-red-500">Category not found.</div>;

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-brand-bg p-4 pb-24">
      <div className="bg-brand-red text-white p-6 rounded-2xl mb-6 shadow-md">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-sm opacity-90 mt-1">Explore our collection of {category.name.toLowerCase()} products.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {products?.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 py-8">No products found in this category.</div>
        ) : (
          products?.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative w-full aspect-square bg-gray-100">
                <Image src={p.image_url} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{p.title}</h3>
                <p className="text-sm font-medium text-brand-red mt-1">{p.price.toLocaleString()} XAF</p>
                {p.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}