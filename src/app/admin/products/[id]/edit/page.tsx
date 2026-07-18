"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({ data }) => {
      if (data) setCategories(data);
    });
    supabase.from("products").select("*").eq("id", id).single().then(({ data, error }) => {
      if (error) { alert("Error loading product"); router.push("/admin/products"); return; }
      setTitle(data.title);
      setPrice(data.price.toString());
      setDescription(data.description || "");
      setCategoryId(data.category_id || "");
      setImageUrl(data.image_url);
      setLoading(false);
    });
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const updates: any = { title, price: Number(price), description: description || null, category_id: categoryId || null };
    const { error } = await supabase.from("products").update(updates).eq("id", id);
    if (error) alert("Error: " + error.message); else router.push("/admin/products");
    setSaving(false);
  };

  if (loading) return <div className="text-gray-500 dark:text-gray-400">Loading...</div>;
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Title</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (XAF)</label>
          <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow">
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Current image:</p>
          <img src={imageUrl} alt="Current" className="w-24 h-24 object-cover rounded mt-1" />
        </div>
        <button type="submit" disabled={saving} className="w-full bg-brand-red text-white py-2 rounded-xl font-semibold hover:bg-[#7a0a14] disabled:opacity-50">{saving ? "Saving..." : "Update Product"}</button>
      </form>
    </div>
  );
}
