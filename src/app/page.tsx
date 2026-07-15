import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-brand-red mb-4">CSM Buea</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
        Your trusted source for <span className="font-semibold text-brand-black">electronics</span>, 
        <span className="font-semibold text-brand-black"> appliances</span>, and 
        <span className="font-semibold text-brand-black"> home decor</span> in Cameroon.
      </p>
      
      <Link
        href="/products"
        className="bg-brand-red text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:bg-[#7a0a14] transition-transform active:scale-95"
      >
        Start Shopping
      </Link>
    </div>
  );
}
