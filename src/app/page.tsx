import Link from "next/link";
import { 
  ShoppingBag, ChevronRight, MessageCircle, Users, Music2, Facebook, MapPin 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-full bg-brand-red flex flex-col items-center justify-center px-4 pt-16 pb-10">
      {/* Main Typography Hero - White on Deep Crimson */}
      <div className="flex flex-col items-center text-center max-w-full mb-8">
        <h1 className="text-[clamp(3rem,12vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white drop-shadow-sm">
          CHINESE
        </h1>
        <h1 className="text-[clamp(3rem,12vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white drop-shadow-sm -mt-1">
          SUPERMARKET
        </h1>
        <h1 className="text-[clamp(3rem,12vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-yellow drop-shadow-sm -mt-1">
          BUEA
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/80 font-medium tracking-wide px-4 text-center leading-relaxed max-w-sm mx-auto">
          We operate in two locations in Buea: St. Luke Junction & Tar Street, Muea Market.
        </p>
      </div>

      {/* CTA Buttons - Primary Yellow, Muted Red for others */}
      <div className="w-full max-w-md flex flex-col gap-3 mt-2">
        
        {/* 1. Browse Catalog (Golden Yellow CTA - The Anchor) */}
        <Link 
          href="/products"
          className="group flex items-center justify-between w-full bg-brand-yellow text-brand-black px-6 py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Browse Catalog</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* 2. WhatsApp Individual (Muted Red transparent) */}
        <a 
          href="https://wa.me/237682712423" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-white/10 text-white backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <MessageCircle size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Chat on WhatsApp</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 3. WhatsApp Group (Muted Red transparent) */}
        <a 
          href="https://chat.whatsapp.com/E7s6tWIwyosIjsuIZ4lVoN" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-white/10 text-white backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Users size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Join WhatsApp Group</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 4. TikTok (Muted Red transparent) */}
        <a 
          href="https://www.tiktok.com/@chinesesupermarketbuea" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-white/10 text-white backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Music2 size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Follow on TikTok</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 5. Facebook (Muted Red transparent) */}
        <a 
          href="https://www.facebook.com/share/1GRNKf33EP/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-white/10 text-white backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Facebook size={22} />
            <span className="text-lg font-bold uppercase tracking-wide">Like on Facebook</span>
          </div>
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>

        {/* 6. Visit Our Store (Muted Red transparent) */}
        <a 
          href="https://maps.app.goo.gl/Y6oTaTGH5NqqiMjZ8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-white/10 text-white backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
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
