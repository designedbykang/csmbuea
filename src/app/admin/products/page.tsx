import { createSupabaseServerClient } from "@/lib/serverSupabase";
import { ProductChatBubble } from "@/components/admin/ProductChatBubble";
import Link from "next/link";

export default async function AdminProductsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-4 text-red-500">Error loading products: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#efeae2] p-4 pb-24">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#efeae2] py-2 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Products</h1>
        <Link href="/admin/upload" className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-green-600">
          + New Product
        </Link>
      </div>
      <div className="flex flex-col max-w-2xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">No products yet. Tap "New Product" to start!</div>
        ) : (
          products.map((p: any) => (
            <ProductChatBubble
              key={p.id}
              imageUrl={p.image_url}
              title={p.title}
              price={p.price}
              description={p.description}
              createdAt={new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          ))
        )}
      </div>
    </div>
  );
}