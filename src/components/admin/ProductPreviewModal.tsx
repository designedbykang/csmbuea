function ProductPreviewModal({ file, onClose, onPost }: { file: File; onClose: () => void; onPost: (title: string, price: number, desc: string, file: File) => Promise<void> }) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = URL.createObjectURL(file);
  useEffect(() => { return () => URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [step]);

  const handleNext = () => { if (step < 2) setStep(step + 1); else setStep(3); };
  const handleSubmit = async () => {
    setSubmitting(true);
    // Convert price to number, fallback to 0 if invalid
    const priceNumber = Number(price) || 0;
    await onPost(title, priceNumber, desc, file);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <button onClick={onClose} className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white"><X size={28} /></button>
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <Image src={previewUrl} alt="Preview" fill className="object-contain" />
      </div>
      {step < 3 && !submitting && (
        <div className="absolute bottom-12 left-4 right-4">
          <input ref={inputRef} type="text" placeholder={step === 0 ? "Title" : step === 1 ? "Price (XAF)" : "Description"} value={step === 0 ? title : step === 1 ? price : desc} onChange={(e) => { if (step === 0) setTitle(e.target.value); else if (step === 1) setPrice(e.target.value); else setDesc(e.target.value); }} onKeyDown={(e) => { if (e.key === "Enter") handleNext(); }} className="w-full bg-[#2d2d2d] rounded-full px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-green-500" />
        </div>
      )}
      {step === 3 && !submitting && (
        <div className="absolute bottom-6 right-4">
          <button onClick={handleSubmit} className="p-4 bg-green-500 rounded-full text-white shadow-lg"><Send size={24} /></button>
        </div>
      )}
    </div>
  );
}