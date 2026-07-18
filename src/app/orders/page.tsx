"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Package, Truck, CheckCircle } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (!error && data) setOrders(data); setLoading(false);
    });
  }, []);
  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading orders...</div>;
  return (
    <div className="min-h-full bg-brand-bg dark:bg-[#0b141a] p-6 pb-24">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-[#1f2a30] p-8 rounded-2xl text-center shadow-sm"><Package size={48} className="mx-auto text-gray-300 dark:text-gray-500 mb-4" /><p className="text-gray-500 dark:text-gray-400">You haven&apos;t placed any orders yet.</p></div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`} className="block bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div><p className="font-bold text-gray-900 dark:text-gray-100">Order #{order.id.slice(0,8)}</p><p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p></div>
                <span className="bg-brand-yellow/20 text-brand-black dark:bg-brand-yellow/20 dark:text-brand-yellow px-3 py-1 rounded-full text-xs font-semibold capitalize">{order.status}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2"><span className="flex items-center gap-1"><CheckCircle size={14} className="text-brand-red dark:text-brand-yellow" /> Paid</span><span className="text-gray-300 dark:text-gray-500">|</span><span className="flex items-center gap-1"><Truck size={14} className="text-gray-400" /> {order.delivery_type}</span></div>
              <div className="border-t pt-2 mt-2">{order.order_items?.map((item: any) => <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-300"><span>{item.quantity}x {item.product_title}</span><span>{item.product_price.toLocaleString()} XAF</span></div>)}</div>
              <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-gray-900 dark:text-gray-100"><span>Total</span><span>{order.total_amount.toLocaleString()} XAF</span></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
