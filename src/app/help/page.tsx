import Link from "next/link";
import { HelpCircle, FileText, ShieldCheck, Mail, Phone, MessageCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-full bg-brand-bg dark:bg-[#0b141a] p-6 pb-24">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Help Center</h1>
      <div className="space-y-4">
        <Link href="/contact" className="block bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><Mail size={22} /></div>
          <div><p className="font-semibold text-gray-900 dark:text-gray-100">Contact Us</p><p className="text-sm text-gray-500 dark:text-gray-400">Get in touch with our support team.</p></div>
        </Link>
        <Link href="/faq" className="block bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><HelpCircle size={22} /></div>
          <div><p className="font-semibold text-gray-900 dark:text-gray-100">FAQ</p><p className="text-sm text-gray-500 dark:text-gray-400">Frequently asked questions answered.</p></div>
        </Link>
        <Link href="/terms" className="block bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><FileText size={22} /></div>
          <div><p className="font-semibold text-gray-900 dark:text-gray-100">Terms of Service</p><p className="text-sm text-gray-500 dark:text-gray-400">Our terms and conditions.</p></div>
        </Link>
        <Link href="/privacy" className="block bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red"><ShieldCheck size={22} /></div>
          <div><p className="font-semibold text-gray-900 dark:text-gray-100">Privacy Policy</p><p className="text-sm text-gray-500 dark:text-gray-400">How we handle your data.</p></div>
        </Link>
        <div className="bg-brand-red/5 dark:bg-brand-red/10 rounded-2xl p-4 border border-brand-red/10">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Quick Support</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-1"><MessageCircle size={16} className="text-brand-red dark:text-brand-yellow" /> WhatsApp: <a href="https://wa.me/237682712423" className="text-brand-red dark:text-brand-yellow hover:underline">+237 682 71 24 23</a></p>
          <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"><Phone size={16} className="text-brand-red dark:text-brand-yellow" /> Call: <a href="tel:+237682712423" className="text-brand-red dark:text-brand-yellow hover:underline">+237 682 71 24 23</a></p>
        </div>
      </div>
    </div>
  );
}
