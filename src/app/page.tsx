import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-2">CSM Buea</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Your trusted source for electronics, appliances, and home decor in Cameroon.
      </p>
      
      <Link
        href="/products"
        className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-green-700 transition-transform active:scale-95"
      >
        Browse Store
      </Link>

      {/* Small admin link in the corner for you to access */}
      <Link
        href="/admin"
        className="mt-12 text-sm text-gray-400 underline hover:text-gray-600"
      >
        Admin Login
      </Link>
    </div>
  );
}