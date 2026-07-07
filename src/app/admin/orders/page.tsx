"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Link href="/admin" className="inline-flex items-center text-gray-600 mb-6">
        <ArrowLeft size={18} className="mr-2" /> Back to Admin
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Incoming Orders</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{order.customer_name}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-xs text-gray-400">{order.address}</p>
                  {order.delivery_type === "pickup" ? <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Pickup</span> : <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Delivery</span>}
                  {order.notes && <p className="text-xs text-gray-500 mt-1 italic">"{order.notes}"</p>}
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{order.total_amount.toLocaleString()} XAF</p>
                  <p className="text-xs text-gray-400 capitalize">{order.status}</p>
                </div>
              </div>
              <div className="border-t pt-2 mt-2">
                <p className="text-xs font-medium text-gray-600 mb-1">Items:</p>
                <div className="space-y-1">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-xs text-gray-600">
                      <span>{item.quantity}x {item.product_title}</span>
                      <span>{item.product_price.toLocaleString()} XAF</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}