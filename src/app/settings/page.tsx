"use client";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { ArrowLeft, Moon, Sun, Bell, Lock, User, ShoppingBag, HelpCircle, Info } from "lucide-react";

type MenuItem = 
  | { icon: any; label: string; href: string; extra?: string }
  | { icon: any; label: string; action: () => void; extra?: string };

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const router = useRouter();

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", href: "/profile" },
        { icon: ShoppingBag, label: "My Orders", href: "/orders" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: theme === "light" ? Moon : Sun, label: "Theme", action: toggleTheme, extra: theme === "light" ? "Light" : "Dark" },
        { icon: Bell, label: "Notifications", href: "/notifications", extra: `${unreadCount} unread` },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", href: "/help" },
        { icon: Info, label: "About", href: "/about" },
      ],
    },
  ];

  return (
    <div className="min-h-full bg-[#efeae2] dark:bg-[#0b141a] p-4 pb-24">
      <button onClick={() => router.back()} className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-4 hover:text-brand-red dark:hover:text-brand-yellow">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Settings</h1>
      <div className="space-y-6">
        {settingsGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{group.title}</h2>
            <div className="bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                  onClick={() => {
                    if ('href' in item && item.href) {
                      router.push(item.href);
                    } else if ('action' in item) {
                      item.action();
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
                  </div>
                  {item.extra && <span className="text-sm text-gray-500 dark:text-gray-400">{item.extra}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
