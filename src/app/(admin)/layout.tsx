"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminHeader from "@/components/AdminHeader";
import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setSession(session);
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/admin/login");
      }
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b141a]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-dvh bg-gray-50 dark:bg-[#0b141a]">
      {/* Mobile responsive nav - hidden on desktop */}
      <div className="hidden md:flex flex-col flex-shrink-0">
        <AdminNav />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto">
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
