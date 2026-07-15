"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { Package, Truck, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TrackOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setOrder(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading tracking...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center text-red-500">Order not found.</div>;

  return (
    <div className="min-h-screen bg-brand-bg p-6 pb-24">
      <Link href="/orders" className="inline-flex items-center text-gray-600 mb-6 hover:text-brand-red">
        <ArrowLeft size={20} className="mr-2" /> Back to Orders
      </Link>
      <h1 className="text-2xl font-bold text-brand-black mb-2">Tracking Order #{id?.toString().slice(0, 8)}</h1>
      <p className="text-sm text-gray-500 mb-6">Status: <span className="text-brand-red font-semibold capitalize">{order.status}</span></p>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-brand-red/10 p-2 rounded-full text-brand-red"><Package size={20} /></div>
          <div>
            <p className="font-medium text-gray-900">Order Placed</p>
            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-2 rounded-full text-gray-400"><Truck size={20} /></div>
          <div>
            <p className="font-medium text-gray-500">Awaiting Shipment</p>
            <p className="text-sm text-gray-400">Our team is preparing your order.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-gray-100 p-2 rounded-full text-gray-300"><CheckCircle size={20} /></div>
          <div>
            <p className="font-medium text-gray-300">Delivered</p>
            <p className="text-sm text-gray-300">Pending...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
