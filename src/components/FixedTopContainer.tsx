"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function FixedTopContainer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="sticky top-0 z-40 bg-white flex flex-col w-full shadow-sm border-b border-gray-100">
      {/* Child 1: Marquee - Only rendered when on the homepage */}
      {isHome && (
        <div className="bg-brand-red text-white py-2 overflow-hidden border-b border-brand-red/20 h-[44px] flex items-center">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-4 text-sm font-bold tracking-wider">SHOP WITH CONFIDENCE. WE DELIVER NATIONWIDE, DELIVERY WITHIN BUEA IS FREE!!!</span>
            <span className="mx-4 text-sm font-bold tracking-wider">SHOP WITH CONFIDENCE. WE DELIVER NATIONWIDE, DELIVERY WITHIN BUEA IS FREE!!!</span>
          </div>
        </div>
      )}
      
      {/* Child 2: Header - Knows its physical position relative to the parent */}
      <Header />
    </div>
  );
}