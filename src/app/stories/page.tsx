"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { X, Play, ChevronRight } from "lucide-react";

export default function StoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState<any>(null);

  useEffect(() => {
    supabase.from("stories").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setStories(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading stories...</div>;

  return (
    <div className="bg-[#efeae2] dark:bg-[#0b141a] min-h-full p-4 pb-24 relative">
      <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-4 hover:text-brand-red dark:hover:text-brand-yellow">
        <X size={24} className="mr-2" /> Close
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Store Stories</h1>
      <div className="flex gap-3 overflow-x-auto pb-4 snap-x">
        {stories.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No stories available.</p>
        ) : (
          stories.map((story) => (
            <button key={story.id} onClick={() => setActiveStory(story)} className="snap-center shrink-0 w-24 text-center group">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-brand-red dark:border-brand-yellow shadow-sm group-hover:scale-105 transition-transform">
                <Image src={story.media_url} alt={story.caption || "Story"} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">{story.caption || "New Arrival"}</p>
            </button>
          ))
        )}
      </div>

      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <button onClick={() => setActiveStory(null)} className="absolute top-6 right-6 text-white/70 hover:text-white z-10">
            <X size={32} />
          </button>
          <div className="relative w-full max-w-md h-full max-h-[80vh] flex items-center justify-center">
            <Image src={activeStory.media_url} alt="Story" fill className="object-contain" />
          </div>
          {activeStory.caption && (
            <div className="absolute bottom-10 left-0 right-0 text-center px-4">
              <p className="text-white text-lg font-medium drop-shadow-lg">{activeStory.caption}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
