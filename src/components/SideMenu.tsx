"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  X, Home, Package, ShoppingBag, Heart, Clock, Phone, Info, HelpCircle, LogOut, User 
} from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-[80%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
        
        {/* Header Section */}
        <div className="p-6 bg-brand-red text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
          <button onClick={() => handleNavigation("/")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Home size={20} className="text-brand-red" />
            <span className="font-medium">Home</span>
          </button>

          <button onClick={() => handleNavigation("/products")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Package size={20} className="text-brand-red" />
            <span className="font-medium">Shop All Products</span>
          </button>

          <button onClick={() => handleNavigation("/orders")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Clock size={20} className="text-brand-red" />
            <span className="font-medium">My Orders</span>
          </button>

          <button onClick={() => handleNavigation("/contact")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Phone size={20} className="text-brand-red" />
            <span className="font-medium">Contact Us</span>
          </button>

          {/* Separator */}
          <div className="border-t border-gray-200 my-2"></div>

          <button onClick={() => handleNavigation("/about")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <Info size={20} className="text-brand-red" />
            <span className="font-medium">About CSM Buea</span>
          </button>

          <button onClick={() => handleNavigation("/faq")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
            <HelpCircle size={20} className="text-brand-red" />
            <span className="font-medium">FAQs</span>
          </button>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700">
            <User size={20} />
            <span className="font-medium">Sign In / Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
