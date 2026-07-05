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

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // Wait 1 second for the browser to commit the session cookies, 
      // then navigate to the admin panel.
      setTimeout(() => {
        router.replace("/admin/products");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full border rounded px-3 py-2 text-sm" required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full border rounded px-3 py-2 text-sm" required 
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-2 rounded text-sm font-semibold transition-colors ${
              isLoading ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}