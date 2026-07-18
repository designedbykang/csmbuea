"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("CSM Buea");
  const [currency, setCurrency] = useState("XAF");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("settings").select("*").limit(1).single().then(({ data }) => {
      if (data) { setStoreName(data.store_name); setCurrency(data.currency); }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from("settings").update({ store_name: storeName, currency }).eq("id", (await supabase.from("settings").select("id").limit(1).single()).data?.id);
    if (error) alert("Error: " + error.message); else alert("Settings saved!");
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Settings</h1>
      <div className="bg-white dark:bg-[#1f2a30] rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 space-y-4 max-w-2xl">
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Store Name</label><input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow" /></div>
        <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label><select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-yellow"><option value="XAF">XAF</option><option value="USD">USD</option><option value="EUR">EUR</option></select></div>
        <button onClick={handleSave} disabled={saving} className="w-full bg-brand-red text-white py-2 rounded-xl font-semibold hover:bg-[#7a0a14] disabled:opacity-50">{saving ? "Saving..." : "Save Settings"}</button>
      </div>
    </div>
  );
}
