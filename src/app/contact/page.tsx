import Link from "next/link"; import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-full bg-brand-bg dark:bg-[#0b141a] p-6 pb-24">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Us</h1>
      <div className="bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-4"><div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><MapPin size={24} /></div><div><p className="font-semibold text-gray-900 dark:text-gray-100">Main Store</p><p className="text-sm text-gray-600 dark:text-gray-300">St. Luke Junction, Checkpoint-Molyko, Buea</p></div></div>
        <div className="flex items-center gap-4"><div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><Phone size={24} /></div><div><p className="font-semibold text-gray-900 dark:text-gray-100">Phone</p><a href="tel:+237682712423" className="text-sm text-brand-red dark:text-brand-yellow hover:underline">+237 682 71 24 23</a></div></div>
        <div className="flex items-center gap-4"><div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><MessageCircle size={24} /></div><div><p className="font-semibold text-gray-900 dark:text-gray-100">WhatsApp</p><a href="https://wa.me/237682712423" className="text-sm text-brand-red dark:text-brand-yellow hover:underline">Chat with us directly</a></div></div>
        <div className="flex items-center gap-4"><div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><Mail size={24} /></div><div><p className="font-semibold text-gray-900 dark:text-gray-100">Email</p><a href="mailto:contact@csmbuea.com" className="text-sm text-brand-red dark:text-brand-yellow hover:underline">contact@csmbuea.com</a></div></div>
      </div>
    </div>
  );
}
