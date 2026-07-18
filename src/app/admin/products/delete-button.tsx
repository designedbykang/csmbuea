"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({ productId }: { productId: string }) {
  return (
    <form action="/api/admin/products/delete" method="POST">
      <input type="hidden" name="id" value={productId} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-800"
        onClick={(e) => !confirm("Delete this product?") && e.preventDefault()}
      >
        <Trash2 size={18} />
      </button>
    </form>
  );
}
