import Link from "next/link";
import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-bg p-6 pb-24">
      <h1 className="text-3xl font-bold text-brand-black mb-6">Contact Us</h1>
      
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
            <MapPin size={24} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Main Store</p>
            <p className="text-sm text-gray-600">St. Luke Junction, Checkpoint-Molyko</p>
            <p className="text-sm text-gray-600">Buea, Cameroon</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
            <Phone size={24} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Phone</p>
            <a href="tel:+237682200403" className="text-sm text-brand-red hover:underline">+237 682 200 403</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
            <MessageCircle size={24} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">WhatsApp</p>
            <a href="https://wa.me/237682200403" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-red hover:underline">Chat with us directly</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-brand-red/10 p-3 rounded-full text-brand-red">
            <Mail size={24} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Email</p>
            <a href="mailto:contact@csmbuea.com" className="text-sm text-brand-red hover:underline">contact@csmbuea.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
