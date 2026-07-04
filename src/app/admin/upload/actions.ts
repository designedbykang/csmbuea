"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function uploadProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  if (!file || !title || !price) {
    throw new Error("Missing required fields");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (uploadError) throw new Error("Failed to upload image");

  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase.from("products").insert({
    title,
    price,
    description: description || null,
    image_url: urlData.publicUrl,
  });

  if (dbError) throw new Error("Failed to save product");

  revalidatePath("/admin/products");
}