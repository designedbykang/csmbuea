import { supabase } from "@/lib/supabase";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    { count: productCount },
    { count: orderCount },
    { count: userCount },
    { data: revenueData },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("total_amount", { count: "exact", head: true }),
    supabase.from("orders").select("total_amount").eq("status", "paid"),
  ]);

  const totalRevenue = revenueData?.reduce((sum, o) => sum + o.total_amount, 0) ?? 0;

  const stats = [
    { label: "Products", value: productCount ?? 0, icon: Package, color: "text-blue-600 dark:text-blue-400" },
    { label: "Orders", value: orderCount ?? 0, icon: ShoppingCart, color: "text-green-600 dark:text-green-400" },
    { label: "Customers", value: userCount ?? 0, icon: Users, color: "text-purple-600 dark:text-purple-400" },
    { label: "Revenue (XAF)", value: totalRevenue.toLocaleString(), icon: DollarSign, color: "text-brand-red dark:text-brand-yellow" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon size={28} className="text-gray-300 dark:text-gray-500" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Orders</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Display the 5 most recent orders here.</p>
        </div>
        <div className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/admin/products/new" className="block w-full text-center py-2 bg-brand-red text-white rounded-xl hover:bg-[#7a0a14]">Add New Product</a>
            <a href="/admin/orders" className="block w-full text-center py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600">View All Orders</a>
          </div>
        </div>
      </div>
    </div>
  );
}
