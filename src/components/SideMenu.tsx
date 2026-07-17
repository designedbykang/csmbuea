"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  X, Home, Package, Clock, Phone, Info, HelpCircle, 
  Utensils, Armchair, Smartphone, WashingMachine, Lightbulb, Trees, Layers, Palette, MoreHorizontal,
  FileText, ShieldCheck, Mail, CreditCard, Instagram, Youtube
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, any> = {
  Utensils, Armchair, Smartphone, WashingMachine, Lightbulb, Trees, Layers, Palette, MoreHorizontal
};

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      supabase.from("categories").select("*").order("name").then(({ data }) => {
        if (data) setCategories(data);
        setLoading(false);
      });
    }
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-[80%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
        
        <div className="p-6 bg-brand-red text-white flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold">CSM Buea</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
          <button onClick={() => handleNavigation("/")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Home size={20} className="text-brand-red" />
            <span className="font-medium">Home</span>
          </button>
          <button onClick={() => handleNavigation("/products")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Package size={20} className="text-brand-red" />
            <span className="font-medium">All Products</span>
          </button>

          <div className="border-t border-gray-200 my-2"></div>

          <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Shop by Category</div>
          
          {loading ? (
            <div className="p-4 text-center text-gray-400 text-sm">Loading...</div>
          ) : (
            categories.map((cat) => {
              const IconComponent = iconMap[cat.icon] || Package;
              return (
                <button 
                  key={cat.id}
                  onClick={() => handleNavigation(`/category/${cat.slug}`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700 group"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={20} className="text-brand-red" />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <span className="text-gray-300 group-hover:translate-x-1 transition-transform">›</span>
                </button>
              );
            })
          )}
          
          <div className="border-t border-gray-200 my-2"></div>
          <button onClick={() => handleNavigation("/orders")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Clock size={20} className="text-brand-red" />
            <span className="font-medium">My Orders</span>
          </button>
        </div>

        <div className="shrink-0 bg-gray-50 border-t border-gray-200 p-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <button onClick={() => handleNavigation("/faq")} className="flex items-center gap-2 text-xs text-gray-600 hover:text-brand-red transition-colors">
              <HelpCircle size={14} /> FAQs
            </button>
            <button onClick={() => handleNavigation("/contact")} className="flex items-center gap-2 text-xs text-gray-600 hover:text-brand-red transition-colors">
              <Mail size={14} /> Contact Us
            </button>
            <button onClick={() => handleNavigation("/about")} className="flex items-center gap-2 text-xs text-gray-600 hover:text-brand-red transition-colors">
              <Info size={14} /> About Us
            </button>
            <button onClick={() => handleNavigation("/terms")} className="flex items-center gap-2 text-xs text-gray-600 hover:text-brand-red transition-colors">
              <FileText size={14} /> Terms
            </button>
            <button onClick={() => handleNavigation("/privacy")} className="flex items-center gap-2 text-xs text-gray-600 hover:text-brand-red transition-colors">
              <ShieldCheck size={14} /> Privacy Policy
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-medium text-gray-500">We accept:</span>
            <div className="flex gap-2">
              <div className="bg-white border border-gray-200 rounded p-1 shadow-sm"><CreditCard size={16} className="text-gray-600" /></div>
              <div className="bg-white border border-gray-200 rounded p-1 shadow-sm"><Smartphone size={16} className="text-gray-600" /></div>
              <div className="bg-gray-800 rounded p-1"><span className="text-[10px] text-white font-bold px-1">MOMO</span></div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-gray-500">Follow us:</span>
            <div className="flex gap-2">
              <a href="https://instagram.com" target="_blank" className="p-1.5 bg-gray-200 rounded-full hover:bg-brand-red hover:text-white transition-colors text-gray-600"><Instagram size={16} /></a>
              <a href="https://youtube.com" target="_blank" className="p-1.5 bg-gray-200 rounded-full hover:bg-brand-red hover:text-white transition-colors text-gray-600"><Youtube size={16} /></a>
              <a href="https://twitter.com" target="_blank" className="p-1.5 bg-gray-200 rounded-full hover:bg-brand-red hover:text-white transition-colors text-gray-600"><X size={16} /></a>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 text-center mt-2 pt-2 border-t border-gray-200">
            © {new Date().getFullYear()} CSM Buea. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}