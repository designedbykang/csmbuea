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
      {/* No conditional top spacing. It just sits at the top of the flex column */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm shrink-0 h-[64px]">
        {/* Hamburger */}
        <button onClick={() => setIsMenuOpen(true)} className="text-brand-black p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Menu size={28} />
        </button>

        {/* Logo Container - Fixed height, aspect ratio-safe */}
        <Link href="/" className="relative h-8 w-32 shrink-0 flex items-center justify-center">
          {/* Placeholder text - DELETE this when you upload logo.svg */}
          <span className="text-xl font-bold text-brand-red tracking-tight">
            CSM <span className="text-brand-black">Buea</span>
          </span>
          
          {/* TODO: Uncomment this when you upload logo.svg to /public
          <Image
            src="/logo.svg"
            alt="CSM Buea"
            fill
            className="object-contain"
            priority
          />
          */}
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

      {/* Side Menu - Renders globally inside layout */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}