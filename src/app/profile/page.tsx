import { supabase } from "@/lib/supabase";
import { User, Clock, Package, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-full bg-[#efeae2] dark:bg-[#0b141a] p-6 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-brand-red text-white p-3 rounded-full">
          <User size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="space-y-4">
        <Link href="/orders" className="block bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="bg-brand-yellow/20 p-3 rounded-full text-brand-black"><Clock size={22} /></div>
          <div><p className="font-semibold text-gray-900 dark:text-gray-100">Order History</p><p className="text-sm text-gray-500 dark:text-gray-400">View your past purchases and track status.</p></div>
        </Link>
        <Link href="/settings" className="block bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><ShieldCheck size={22} /></div>
          <div><p className="font-semibold text-gray-900 dark:text-gray-100">Settings</p><p className="text-sm text-gray-500 dark:text-gray-400">Manage your theme and preferences.</p></div>
        </Link>
        <button className="w-full text-left bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600"><LogOut size={22} /></div>
          <div><p className="font-semibold text-red-600">Logout</p><p className="text-sm text-red-500">Sign out of your account.</p></div>
        </button>
      </div>
    </div>
  );
}
