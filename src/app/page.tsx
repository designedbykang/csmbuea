import Link from "next/link";
import { 
  ShoppingBag, Sparkle, ChevronRight, 
  Music2, Facebook, MessageCircle, MapPin 
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center py-6 px-4">
      
      {/* --- Top Notification Banner --- */}
      <div className="w-full max-w-2xl bg-brand-red text-white text-center text-sm font-semibold py-2.5 rounded-full mb-6 shadow-sm border border-brand-red/50">
        🚀 We deliver to Buea, Limbe & nationwide! Shop with confidence.
      </div>

      {/* --- Background Organic Shapes (Kept for the hero vibe) --- */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#00C4B4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-32 w-[500px] h-[500px] border-[20px] border-brand-red/10 rounded-[50%] rotate-12 pointer-events-none" />
      <Sparkle className="absolute top-32 right-8 w-8 h-8 text-brand-yellow animate-pulse pointer-events-none" />

      {/* --- Main Typography Hero --- */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mt-2 mb-8">
        <h1 className="text-7xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-brand-red drop-shadow-sm">
          Electronics
        </h1>
        <h1 className="text-7xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-brand-black drop-shadow-sm">
          Appliances
        </h1>
        <h1 className="text-7xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-brand-yellow drop-shadow-sm mt-2">
          & Home Decor
        </h1>
        <p className="mt-4 text-sm md:text-base text-gray-500 font-medium tracking-wide">
          Your trusted source for quality products in Buea & Limbe.
        </p>
      </div>

      {/* --- Linktree Buttons --- */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-3 mt-4">
        
        {/* 1. Browse Catalog (The primary CTA) */}
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

        {/* 2. WhatsApp */}
        <a 
          href="https://wa.me/237682200403" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-[#25D366] text-white px-6 py-4 rounded-2xl shadow-md hover:bg-[#1ebe56] hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <MessageCircle size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Chat on WhatsApp</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 3. TikTok */}
        <a 
          href="https://tiktok.com/@csmbuea" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-black text-white px-6 py-4 rounded-2xl shadow-md hover:bg-gray-900 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Music2 size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Follow on TikTok</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 4. Facebook */}
        <a 
          href="https://facebook.com/csmbuea" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-[#1877F2] text-white px-6 py-4 rounded-2xl shadow-md hover:bg-[#1662d9] hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Facebook size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Follow on Facebook</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 5. Store Location (Google Maps) */}
        <a 
          href="https://www.google.com/maps/search/?api=1&query=St.+Luke+Junction,+Buea" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-brand-yellow text-brand-black px-6 py-4 rounded-2xl shadow-md hover:bg-[#e6c200] hover:scale-[1.02] transition-all duration-200"
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