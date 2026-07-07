import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">CSM Buea</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
        Your trusted source for <span className="font-semibold text-gray-900">electronics</span>, 
        <span className="font-semibold text-gray-900"> appliances</span>, and 
        <span className="font-semibold text-gray-900"> home decor</span> in Cameroon.
      </p>
      
      <Link
        href="/products"
        className="bg-[#2B6CB0] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-[#1a4a8a] transition-transform active:scale-95"
      >
        Start Shopping
      </Link>

      <Link
        href="/admin/login"
        className="mt-8 text-sm text-gray-400 underline hover:text-gray-600"
      >
        Admin Login
      </Link>
    </div>
  );
}