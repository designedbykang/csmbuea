"use client";
import Link from "next/link";
import { ShoppingCart, Menu, Search, Bell, Moon, Sun } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useNotifications } from "@/context/NotificationContext";
import { useState } from "react";
import SideMenu from "./SideMenu";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white dark:bg-[#1f2a30] border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center shadow-sm shrink-0 h-[64px] transition-colors">
        <button onClick={() => setIsMenuOpen(true)} className="text-brand-black dark:text-gray-100 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <Menu size={28} />
        </button>

        <form onSubmit={handleSearch} className="flex-1 mx-3 relative hidden sm:block">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow" />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-brand-red dark:hover:text-brand-yellow">
            <Search size={18} />
          </button>
        </form>

        <div className="flex items-center gap-2">
          <button onClick={() => router.push("/search")} className="sm:hidden p-1 text-brand-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Search size={24} />
          </button>

          {/* Logo Container - READY FOR YOUR LOGO */}
          <Link href="/" className="relative h-8 w-32 shrink-0 flex items-center justify-center">
            {/* This <Image /> tag will display your logo. We will add the file next. */}
            <Image src="/logo.svg" alt="CSM Buea" fill className="object-contain" priority />
          </Link>

          <Link href="/notifications" className="relative p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Bell size={24} className="text-brand-black dark:text-gray-100" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          <button onClick={toggleTheme} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            {theme === "light" ? <Moon size={22} className="text-brand-black" /> : <Sun size={22} className="text-brand-yellow" />}
          </button>
          <Link href="/cart" className="relative p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <ShoppingCart size={26} className="text-brand-black dark:text-gray-100" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
