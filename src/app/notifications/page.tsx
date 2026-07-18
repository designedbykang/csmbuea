"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Package, Truck, MessageCircle } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshNotifications } = useNotifications();

  useEffect(() => {
    supabase.from("notifications").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setNotifications(data);
      setLoading(false);
    });
  }, []);

  const markAllAsRead = async () => {
    const { error } = await supabase.from("notifications").update({ is_read: true }).eq("is_read", false);
    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      refreshNotifications();
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading...</div>;

  return (
    <div className="min-h-full bg-[#efeae2] dark:bg-[#0b141a] p-4 pb-24">
      <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-4 hover:text-brand-red dark:hover:text-brand-yellow">
        <ArrowLeft size={20} className="mr-2" /> Back
      </Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Notifications</h1>
        <button onClick={markAllAsRead} className="text-sm text-brand-red dark:text-brand-yellow font-medium hover:underline">Mark all read</button>
      </div>
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10">No notifications yet.</p>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className={`bg-white dark:bg-[#1f2a30] rounded-2xl p-4 shadow-sm flex items-start gap-3 ${!notif.is_read ? "border-l-4 border-brand-red dark:border-brand-yellow" : "opacity-60"}`}>
              <div className="shrink-0 mt-1">
                {notif.type === "order" && <Package size={20} className="text-brand-red dark:text-brand-yellow" />}
                {notif.type === "system" && <MessageCircle size={20} className="text-blue-500" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{notif.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{notif.body}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
