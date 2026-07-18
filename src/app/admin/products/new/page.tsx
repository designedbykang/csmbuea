"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import * as Icons from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

// Map icon names from DB to lucide-react components
const iconMap: Record<string, any> = {
  Utensils: Icons.Utensils,
  Trees: Icons.Trees,
  Lightbulb: Icons.Lightbulb,
  WashingMachine: Icons.Waves,
  Image: Icons.Image,
  Smartphone: Icons.Smartphone,
  MoreHorizontal: Icons.MoreHorizontal,
  Armchair: Icons.Armchair,
  Carpet: Icons.SquareStack, // Fallback for Carpet
};

export default function NewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("categories")
      .select("id, name, slug, icon")
      .order("name")
      .then(({ data }) => {
        if (data) setCategories(data as Category[]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let image_url = "";
      if (imageFile) {
        const fileName = `${Date.now()}.${imageFile.name.split(".").pop()}`;
        const { data, error } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);
        if (error) throw error;
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }
      const { error: dbError } = await supabase.from("products").insert({
        title,
        price: Number(price),
        description: description || null,
        category_id: categoryId || null,
        image_url,
      });
      if (dbError) throw dbError;
      router.push("/admin/products");
    } catch (err) {
      alert("Error: " + (err as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red"
            placeholder="Enter product title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price (XAF)
          </label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Display categories with icons below */}
          {categories.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {categories.map((c) => {
                const IconComponent = iconMap[c.icon];
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategoryId(c.id)}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                      categoryId === c.id
                        ? "border-brand-red bg-brand-red/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-brand-red"
                    }`}
                  >
                    {IconComponent && <IconComponent size={24} />}
                    <span className="text-xs font-medium text-center">{c.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red"
            placeholder="Optional product description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-red text-white py-2 rounded-xl font-semibold hover:bg-[#7a0a14] disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
