"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const trimmedEmail = email.trim();
    const { error } = await supabase.auth.signInWithPassword({ 
      email: trimmedEmail, 
      password 
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // Mark success, then force reload after 2 seconds
      setSuccess(true);
      setTimeout(() => {
        window.location.replace("/admin/products");
      }, 2000);
    }
  };

  // If login succeeded, show a success screen with a manual link
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-80 text-center">
          <h2 className="text-green-600 text-xl font-bold">Logged in!</h2>
          <p className="text-gray-600 mt-2">Redirecting to admin...</p>
          <p className="mt-4 text-sm text-gray-400">
            If you aren't redirected automatically,{" "}
            <a href="/admin/products" className="text-blue-600 underline">
              click here
            </a>.
          </p>
        </div>
      </div>
    );
  }

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
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded text-sm font-semibold transition-colors ${
              isLoading ? "bg-gray-400 text-gray-200" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}