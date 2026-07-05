try {
  await uploadProduct(formData);
  router.push("/admin/products");
} catch (error: any) {
  // Show the actual error message from the server
  const message = error?.message || "Failed to post product. Check console.";
  alert("Error: " + message);
  console.error(error);
  setIsSubmitting(false);
}
