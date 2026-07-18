"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, Hand, Smile } from "lucide-react";

const WHATSAPP_NUMBER = "237682712423";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", deliveryType: "delivery", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNext = () => { if (step === 1 && !form.name.trim()) return; if (step === 2 && !form.phone.trim()) return; setStep(step + 1); setErrorMessage(null); };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setErrorMessage(null);
    try {
      const { data: orderData, error: orderError } = await supabase.from("orders").insert({ customer_name: form.name, phone: form.phone, address: form.deliveryType === "delivery" ? "To be confirmed via WhatsApp" : "Pickup", total_amount: total, delivery_type: form.deliveryType, notes: form.notes }).select().single();
      if (orderError) throw new Error(orderError.message);
      const orderItems = items.map((item) => ({ order_id: orderData.id, product_title: item.title, product_price: item.price, quantity: item.quantity, image_url: item.image_url }));
      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw new Error(itemsError.message);
      clearCart();
      const message = `Hi CSM Buea! 👋 I'd like to place an order.\n\nName: ${form.name}\nPhone: ${form.phone}\nDelivery: ${form.deliveryType === "pickup" ? "Pickup" : "Delivery"}\n${form.notes ? `Notes: ${form.notes}` : ""}\n\nItems:\n${items.map((i) => `- ${i.title} (${i.quantity} × ${i.price.toLocaleString()} XAF)`).join("\n")}\n\nTotal: ${total.toLocaleString()} XAF\n\nLooking forward to hearing from you!`;
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    } catch (err: any) { setErrorMessage(err.message || "Unknown error."); setSubmitting(false); }
  };

  return (
    <div className="min-h-full bg-white dark:bg-[#0b141a] p-4 pb-24 max-w-md mx-auto">
      <Link href="/cart" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-6 hover:text-brand-red dark:hover:text-brand-yellow"><ArrowLeft size={20} className="mr-2" /> Back</Link>
      <div className="flex flex-col gap-6">
        <div className="bg-brand-red text-white p-4 rounded-2xl rounded-tl-none shadow-sm"><p className="text-lg font-semibold flex items-center">Almost done! <Hand size={20} className="ml-2" /></p><p className="text-sm mt-1 opacity-90">Let's prepare your order before we chat on WhatsApp.</p></div>
        {errorMessage && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 p-4 rounded-xl text-sm">❌ {errorMessage}</div>}
        {step === 1 && (<div className="bg-white dark:bg-[#1f2a30] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"><p className="font-medium text-gray-800 dark:text-gray-200 mb-2">What's your name?</p><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow" placeholder="e.g. John Doe" autoFocus /><button onClick={handleNext} disabled={!form.name.trim()} className="mt-4 w-full bg-brand-red text-white py-3 rounded-full font-semibold hover:bg-[#7a0a14] disabled:opacity-50">Next</button></div>)}
        {step === 2 && (<div className="bg-white dark:bg-[#1f2a30] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"><p className="font-medium text-gray-800 dark:text-gray-200 mb-2">Your WhatsApp / phone number?</p><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow" placeholder="e.g. 6XX XXX XXX" /><button onClick={handleNext} disabled={!form.phone.trim()} className="mt-4 w-full bg-brand-red text-white py-3 rounded-full font-semibold hover:bg-[#7a0a14] disabled:opacity-50">Next</button></div>)}
        {step === 3 && (<div className="bg-white dark:bg-[#1f2a30] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"><p className="font-medium text-gray-800 dark:text-gray-200 mb-2">Pickup or delivery?</p><div className="flex gap-3"><button onClick={() => setForm({ ...form, deliveryType: "delivery" })} className={`flex-1 py-3 rounded-full border font-semibold ${form.deliveryType === "delivery" ? "bg-brand-red text-white border-brand-red" : "bg-white text-gray-700 border-gray-300 hover:border-brand-red dark:bg-gray-800 dark:text-gray-300"}`}>Delivery</button><button onClick={() => setForm({ ...form, deliveryType: "pickup" })} className={`flex-1 py-3 rounded-full border font-semibold ${form.deliveryType === "pickup" ? "bg-brand-red text-white border-brand-red" : "bg-white text-gray-700 border-gray-300 hover:border-brand-red dark:bg-gray-800 dark:text-gray-300"}`}>Pickup</button></div><button onClick={handleNext} className="mt-4 w-full bg-brand-red text-white py-3 rounded-full font-semibold hover:bg-[#7a0a14]">Next</button></div>)}
        {step === 4 && (<div className="bg-white dark:bg-[#1f2a30] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm"><p className="font-medium text-gray-800 dark:text-gray-200 mb-2">Anything else we should know?</p><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow h-24 resize-none" placeholder="Optional" /><button onClick={handleSubmit} disabled={submitting} className="mt-4 w-full bg-brand-red text-white py-3 rounded-full font-semibold hover:bg-[#7a0a14] disabled:opacity-50">{submitting ? "Sending..." : "Finish & Chat on WhatsApp"}</button><p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3 flex items-center justify-center">We'll save your order and continue on WhatsApp <Smile size={16} className="ml-1" /></p></div>)}
        <div className="flex justify-center gap-2 mt-2">{/* Dots */}{[1,2,3,4].map((s) => <div key={s} className={`w-2.5 h-2.5 rounded-full transition-colors ${s <= step ? "bg-brand-red" : "bg-gray-300 dark:bg-gray-600"}`} />)}</div>
      </div>
    </div>
  );
}
