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
    /* Changed z-50 to z-[100] to guarantee it overlays everything, including the sticky checkout button */
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-[80%] max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-in-left">
        {/* ... (rest of the drawer content remains exactly the same) ... */}
      </div>
    </div>
  );
}