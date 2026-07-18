"use client";
import { useState } from "react"; import { ChevronDown } from "lucide-react";
const faqs = [
  { q: "Do you deliver nationwide?", a: "Yes! We offer delivery to Buea, Limbe, and nationwide via partner couriers." },
  { q: "What are your store hours?", a: "Tuesday to Sunday, 8:00 AM to 8:00 PM." },
  { q: "Can I pick up my order?", a: "Absolutely. Select 'Pickup' at checkout for our two Buea locations." },
  { q: "What payment methods do you accept?", a: "We accept Mobile Money (Momo), Bank Transfers, and Card payments." },
  { q: "How do I contact support?", a: "Reach us via WhatsApp at +237 682 71 24 23." },
];
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="min-h-full bg-brand-bg dark:bg-[#0b141a] p-6 pb-24">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-900 dark:text-gray-100">{faq.q}</span>
              <ChevronDown size={18} className={`text-gray-400 dark:text-gray-500 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
