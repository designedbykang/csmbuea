"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import SideMenu from "./SideMenu";
import Image from "next/image";

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-sm h-[60px] w-full">
        <button onClick={() => setIsMenuOpen(true)} className="text-brand-black p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={28} />
        </button>

        <Link href="/" className="flex items-center h-8 relative w-auto">
          <div className="flex items-center">
            <span className="text-xl font-bold text-brand-red tracking-tight">
              CSM <span className="text-brand-black">Buea</span>
            </span>
          </div>
        </Link>

        <Link href="/cart" className="relative p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart size={26} className="text-brand-black" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}