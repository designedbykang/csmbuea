import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Orders</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div><p className="font-bold text-gray-900 dark:text-gray-100">#{order.id.slice(0,8)}</p><p className="text-sm text-gray-500 dark:text-gray-400">{order.customer_name} • {order.phone}</p><p className="text-xs text-gray-400 dark:text-gray-500">{new Date(order.created_at).toLocaleString()}</p></div>
                <div className="text-right"><span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 capitalize">{order.status}</span><p className="font-bold text-gray-900 dark:text-gray-100 mt-1">{order.total_amount.toLocaleString()} XAF</p></div>
              </div>
              <div className="mt-3 border-t pt-3"><p className="text-xs font-medium text-gray-600 dark:text-gray-300">Items:</p>{order.order_items?.map((item: any) => <div key={item.id} className="flex justify-between text-xs text-gray-600 dark:text-gray-300"><span>{item.quantity}x {item.product_title}</span><span>{item.product_price.toLocaleString()} XAF</span></div>)}</div>
              <div className="mt-3 flex gap-2"><Link href={`/admin/orders/${order.id}`} className="px-3 py-1 bg-brand-red text-white text-xs rounded-full hover:bg-[#7a0a14]">View / Update</Link></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
