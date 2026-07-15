"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Do you deliver nationwide?", a: "Yes! We offer delivery to Buea, Limbe, and nationwide via partner couriers. You can select your shipping method at checkout." },
  { q: "What are your store hours?", a: "We are open Monday to Saturday, 9:00 AM to 7:00 PM. We are closed on Sundays." },
  { q: "Can I pick up my order from the store?", a: "Absolutely. We have two locations in Buea (Molyko and St. Luke Junction). Just select 'Pickup' at checkout." },
  { q: "What payment methods do you accept?", a: "We accept Mobile Money (Momo), Bank Transfers, and Card payments via our secure online checkout." },
  { q: "How do I contact support?", a: "You can reach us via WhatsApp at +237 682 200 403, or visit our contact page for email and phone details." },
  { q: "Do you offer warranties on electronics?", a: "Yes! Most of our electronics come with a manufacturer warranty. Please check the product description for specific warranty details." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-brand-bg p-6 pb-24">
      <h1 className="text-3xl font-bold text-brand-black mb-6">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.q}</span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
