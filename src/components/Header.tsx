"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import SideMenu from "./SideMenu";

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* The actual Header Bar - pushed down 44px to sit below the marquee */}
      <header className="sticky top-[44px] z-40 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm">
        {/* Hamburger Button */}
        <button onClick={() => setIsMenuOpen(true)} className="text-brand-black p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={28} />
        </button>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-brand-red tracking-tight">
          CSM <span className="text-brand-black">Buea</span>
        </Link>

        {/* Cart Icon */}
        <Link href="/cart" className="relative p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart size={26} className="text-brand-black" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </header>

      {/* The Slide-out Drawer */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}