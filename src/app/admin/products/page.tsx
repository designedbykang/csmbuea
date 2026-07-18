import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";

export default async function AdminProductsPage() {
  // Fetch products and categories in parallel
  const [{ data: products, error: productsError }, { data: categories, error: categoriesError }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("categories").select("id, name").order("name"),
  ]);

  if (productsError) return <div className="text-red-500">Error: {productsError.message}</div>;
  if (categoriesError) return <div className="text-red-500">Error: {categoriesError.message}</div>;

  // Build a lookup map for categories
  const categoryMap = new Map<string, string>();
  categories?.forEach((c) => categoryMap.set(c.id, c.name));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
        <Link href="/admin/products/new" className="bg-brand-red text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#7a0a14]">
          <Plus size={18} /> Add Product
        </Link>
      </div>
      <div className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{p.title}</td>
                <td className="px-4 py-3">{p.price.toLocaleString()} XAF</td>
                <td className="px-4 py-3">{p.category_id ? categoryMap.get(p.category_id) || "—" : "—"}</td>
                <td className="px-4 py-3 flex gap-2">
                  <Link href={`/admin/products/${p.id}/edit`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800"><Pencil size={18} /></Link>
                  <form action={`/api/admin/products/delete`} method="POST">
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="text-red-600 hover:text-red-800" onClick={(e) => !confirm("Delete this product?") && e.preventDefault()}>
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
