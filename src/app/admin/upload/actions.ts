"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function uploadProduct(formData: FormData) {
  const cookieStore = await cookies();

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

  // 1. Verify user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  if (!file || !title || !price) {
    return { success: false, error: "Missing required fields (title, price, or image)." };
  }

  // 2. Upload image to Supabase Storage
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { success: false, error: `Upload failed: ${uploadError.message}` };
  }

  // 3. Get the public URL
  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  // 4. Insert product into database
  const { error: dbError } = await supabase.from("products").insert({
    title,
    price,
    description: description || null,
    image_url: urlData.publicUrl,
  });

  if (dbError) {
    console.error("Database error:", dbError);
    return { success: false, error: `Database error: ${dbError.message}` };
  }

  revalidatePath("/admin/products");
  return { success: true };
}