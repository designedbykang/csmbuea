"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Store, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BottomNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is logged in (admin)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });
  }, []);

  // Hide bottom nav on checkout pages
  if (pathname.startsWith("/checkout")) return null;

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 pb-safe shadow-lg z-50">
      <Link
        href="/products"
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          pathname === "/products" ? "text-[#2B6CB0]" : "text-gray-500"
        }`}
      >
        <Store size={24} />
        <span className="text-[10px] font-medium">Products</span>
      </Link>

      <Link
        href="/cart"
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${
          pathname === "/cart" ? "text-[#2B6CB0]" : "text-gray-500"
        }`}
      >
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-medium">Cart</span>
      </Link>

      {isAdmin && (
        <Link
          href="/admin"
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            pathname.startsWith("/admin") ? "text-[#2B6CB0]" : "text-gray-500"
          }`}
        >
          <User size={24} />
          <span className="text-[10px] font-medium">Admin</span>
        </Link>
      )}
    </div>
  );
}