"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "lucide-react";

export default function AdminOrderDetailPage() {
  const { id } = useParams(); const router = useRouter();
  const [order, setOrder] = useState<any>(null); const [loading, setLoading] = useState(true); const [status, setStatus] = useState("");
  useEffect(() => {
    supabase.from("orders").select("*, order_items(*)").eq("id", id).single().then(({ data, error }) => {
      if (error) { alert("Order not found"); router.push("/admin/orders"); return; }
      setOrder(data); setStatus(data.status); setLoading(false);
    });
  }, [id, router]);
  const updateStatus = async () => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) alert("Error: " + error.message); else alert("Status updated");
  };
  if (loading) return <div className="text-gray-500 dark:text-gray-400">Loading...</div>;
  return (
    <div>
      <button onClick={() => router.back()} className="flex items-center text-gray-600 dark:text-gray-400 mb-4 hover:text-brand-red dark:hover:text-brand-yellow"><ArrowLeft size={20} className="mr-2" /> Back</button>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Order #{id?.toString().slice(0,8)}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{order.customer_name} • {order.phone}</p>
      <div className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 space-y-4">
        <div><h2 className="font-semibold text-gray-900 dark:text-gray-100">Items</h2>{order.order_items?.map((item: any) => <div key={item.id} className="flex justify-between text-sm py-1"><span>{item.quantity}x {item.product_title}</span><span>{item.product_price.toLocaleString()} XAF</span></div>)}<div className="border-t mt-2 pt-2 flex justify-between font-bold"><span>Total</span><span>{order.total_amount.toLocaleString()} XAF</span></div></div>
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-transparent"><option value="pending">Pending</option><option value="paid">Paid</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select><button onClick={updateStatus} className="mt-2 px-4 py-1 bg-brand-red text-white rounded-full hover:bg-[#7a0a14]">Update Status</button></div>
        <div><p className="text-sm text-gray-600 dark:text-gray-300">Delivery: {order.delivery_type}</p><p className="text-sm text-gray-600 dark:text-gray-300">Address: {order.address}</p>{order.notes && <p className="text-sm text-gray-500 dark:text-gray-400 italic">Notes: {order.notes}</p>}</div>
      </div>
    </div>
  );
}
