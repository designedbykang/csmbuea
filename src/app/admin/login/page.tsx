"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const trimmedEmail = email.trim();
    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full bg-[#2B6CB0] text-white py-2 rounded hover:bg-[#1a4a8a] disabled:bg-gray-400">
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}