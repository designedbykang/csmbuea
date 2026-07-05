"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function uploadProduct(formData: FormData) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  // ... rest of the upload logic (unchanged)
}