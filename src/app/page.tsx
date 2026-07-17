import Link from "next/link";
import { 
  ShoppingBag, Sparkle, ChevronRight, 
  MessageCircle, Users, Music2, Facebook, MapPin 
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center pt-[100px] pb-10 px-4">
      
      {/* --- Fixed Top Notification Band (Marquee) --- */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-brand-red text-white py-2 overflow-hidden border-b border-brand-red/20 shadow-md h-[44px] flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="mx-4 text-sm font-bold tracking-wider">SHOP WITH CONFIDENCE. WE DELIVER NATIONWIDE, DELIVERY WITHIN BUEA IS FREE!!!</span>
          <span className="mx-4 text-sm font-bold tracking-wider">SHOP WITH CONFIDENCE. WE DELIVER NATIONWIDE, DELIVERY WITHIN BUEA IS FREE!!!</span>
        </div>
      </div>

      {/* --- Background Organic Shapes --- */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#00C4B4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-32 w-[500px] h-[500px] border-[20px] border-brand-red/10 rounded-[50%] rotate-12 pointer-events-none" />
      <Sparkle className="absolute top-32 right-8 w-8 h-8 text-brand-yellow animate-pulse pointer-events-none" />

      {/* --- Main Typography Hero (Fluid Clamped Size) --- */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-full mt-2 mb-6">
        <h1 className="text-[clamp(2.4rem,10vw,6rem)] font-black uppercase leading-[0.85] tracking-tight text-brand-red drop-shadow-sm">
          Electronics
        </h1>
        <h1 className="text-[clamp(2.4rem,10vw,6rem)] font-black uppercase leading-[0.85] tracking-tight text-brand-black drop-shadow-sm -mt-1">
          Appliances
        </h1>
        <h1 className="text-[clamp(2.4rem,10vw,6rem)] font-black uppercase leading-[0.85] tracking-tight text-brand-yellow drop-shadow-sm -mt-1">
          & Home Decor
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-gray-500 font-medium tracking-wide px-4 text-center leading-relaxed">
          Two locations in Buea: St. Luke Junction & Tar Street, Muea Market.
        </p>
      </div>

      {/* --- Linktree Buttons --- */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-3 mt-2">
        
        {/* 1. Browse Catalog (Primary CTA - Red) */}
        <Link 
          href="/products"
          className="group flex items-center justify-between w-full bg-brand-red text-white px-6 py-4 rounded-2xl shadow-md hover:bg-[#7a0a14] hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Browse Catalog</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* 2. WhatsApp Individual (Muted Gray) */}
        <a 
          href="https://wa.me/237682712423" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-gray-200 text-gray-800 px-6 py-4 rounded-2xl shadow-sm hover:bg-gray-300 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <MessageCircle size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Chat on WhatsApp</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 3. WhatsApp Group (Muted Gray) */}
        <a 
          href="https://chat.whatsapp.com/E7s6tWIwyosIjsuIZ4lVoN" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-gray-200 text-gray-800 px-6 py-4 rounded-2xl shadow-sm hover:bg-gray-300 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Users size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Join WhatsApp Group</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 4. TikTok (Muted Gray) */}
        <a 
          href="https://www.tiktok.com/@chinesesupermarketbuea" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-gray-200 text-gray-800 px-6 py-4 rounded-2xl shadow-sm hover:bg-gray-300 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Music2 size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Follow on TikTok</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 5. Facebook (Muted Gray) */}
        <a 
          href="https://www.facebook.com/share/1GRNKf33EP/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-gray-200 text-gray-800 px-6 py-4 rounded-2xl shadow-sm hover:bg-gray-300 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Facebook size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Like on Facebook</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 6. Visit Our Store (Muted Gray) */}
        <a 
          href="https://maps.app.goo.gl/Y6oTaTGH5NqqiMjZ8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-gray-200 text-gray-800 px-6 py-4 rounded-2xl shadow-sm hover:bg-gray-300 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <MapPin size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Visit Our Store</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

      </div>

    </div>
  );
}