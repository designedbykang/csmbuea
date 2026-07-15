"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  X, Home, Package, ShoppingBag, Heart, Clock, Phone, Info, HelpCircle, LogOut, User,
  Utensils, Armchair, Smartphone, WashingMachine, Lightbulb, Trees, Carpet, Image as ImageIcon, MoreHorizontal
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Map Lucide icons to strings
const iconMap: Record<string, any> = {
  Utensils, Armchair, Smartphone, WashingMachine, Lightbulb, Trees, Carpet, ImageIcon, MoreHorizontal
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
        
        <div className="p-6 bg-brand-red text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">CSM Buea</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
          {/* Quick Links */}
          <button onClick={() => handleNavigation("/")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Home size={20} className="text-brand-red" />
            <span className="font-medium">Home</span>
          </button>
          <button onClick={() => handleNavigation("/products")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Package size={20} className="text-brand-red" />
            <span className="font-medium">All Products</span>
          </button>

          <div className="border-t border-gray-200 my-2"></div>

          {/* Shop by Category Section */}
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
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={() => handleNavigation("/orders")} className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700">
            <Clock size={20} />
            <span className="font-medium">My Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
}
