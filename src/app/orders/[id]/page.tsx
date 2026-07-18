"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Clock, User, Package } from "lucide-react";
import Link from "next/link";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("orders").select("*, order_items(*)").eq("id", id).single().then(({ data, error }) => {
      if (!error && data) setOrder(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading...</div>;
  if (!order) return <div className="flex items-center justify-center h-full text-red-500">Order not found.</div>;

  return (
    <div className="min-h-full bg-[#efeae2] dark:bg-[#0b141a] p-4 pb-24">
      <Link href="/orders" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-4 hover:text-brand-red dark:hover:text-brand-yellow">
        <ArrowLeft size={20} className="mr-2" /> Back to Orders
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Order #{id?.toString().slice(0,8)}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Status: <span className="text-brand-red dark:text-brand-yellow font-semibold capitalize">{order.status}</span></p>

      <div className="bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 space-y-4">
        <div className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="bg-brand-red/10 dark:bg-brand-red/20 p-2 rounded-full text-brand-red dark:text-brand-yellow">
            <User size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{order.customer_name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{order.phone}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{order.address}</p>
          </div>
        </div>

        <div className="space-y-2">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">{item.quantity}x {item.product_title}</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{item.product_price.toLocaleString()} XAF</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-900 dark:text-gray-100">Total</span>
            <span className="text-gray-900 dark:text-gray-100">{order.total_amount.toLocaleString()} XAF</span>
          </div>
        </div>

        <div className="flex items-start gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="bg-brand-yellow/10 p-2 rounded-full text-brand-black dark:text-brand-yellow">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Order placed</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.created_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
