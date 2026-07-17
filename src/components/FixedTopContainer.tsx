"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function FixedTopContainer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full flex flex-col bg-white/80 backdrop-blur-md border-b border-gray-200/40 pt-[env(safe-area-inset-top,0px)]">
      {isHome && (
        <div className="bg-brand-red text-white py-2 overflow-hidden border-b border-brand-red/20 h-[44px] flex items-center">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-4 text-sm font-bold tracking-wider">SHOP WITH CONFIDENCE. WE DELIVER NATIONWIDE, DELIVERY WITHIN BUEA IS FREE!!!</span>
            <span className="mx-4 text-sm font-bold tracking-wider">SHOP WITH CONFIDENCE. WE DELIVER NATIONWIDE, DELIVERY WITHIN BUEA IS FREE!!!</span>
          </div>
        </div>
      )}
      <Header />
    </div>
  );
}