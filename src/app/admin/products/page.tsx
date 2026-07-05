import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-[#efeae2] p-4 pb-24">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#efeae2] py-2 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Products</h1>
        <Link href="/admin/upload" className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-green-600">
          + New Product
        </Link>
      </div>
      <div className="text-center text-gray-600 mt-20 text-sm">
        ✅ If you see this text, the Server Component is rendering correctly.
        <br />
        The crash is coming from the database connection.
      </div>
    </div>
  );
}