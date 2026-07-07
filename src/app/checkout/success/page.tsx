import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
      <p className="text-gray-600 mb-8 max-w-sm">
        Thank you for shopping with CSM Buea. We will contact you shortly to confirm your order and arrange delivery.
      </p>
      <Link href="/products" className="bg-[#2B6CB0] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a4a8a]">
        Continue Shopping
      </Link>
    </div>
  );
}