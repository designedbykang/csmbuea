"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function uploadProduct(formData: FormData) {
  const cookieStore = cookies();
  
  // Create the supabase server client with cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Verify the user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized. Please log in.");
  }

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  if (!file || !title || !price) {
    throw new Error("Missing required fields");
  }

  // 1. Upload image to Supabase Storage
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (uploadError) {
    console.error("Upload Error:", uploadError);
    throw new Error("Failed to upload image to storage");
  }

  // 2. Get the public URL
  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  // 3. Insert product into database
  const { error: dbError } = await supabase.from("products").insert({
    title,
    price,
    description: description || null,
    image_url: urlData.publicUrl,
  });

  if (dbError) {
    console.error("Database Error:", dbError);
    throw new Error("Failed to save product to database");
  }

  revalidatePath("/admin/products");
}