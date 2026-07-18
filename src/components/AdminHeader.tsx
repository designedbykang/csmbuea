"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#1f2a30] border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center shadow-sm h-[64px]">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-xl font-bold text-brand-red dark:text-brand-yellow hover:opacity-80">
          CSM Admin
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
}
