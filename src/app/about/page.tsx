export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg p-6 pb-24">
      <h1 className="text-3xl font-bold text-brand-black mb-6">About CSM Buea</h1>
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4 text-gray-700 leading-relaxed">
        <p>
          <span className="font-bold text-brand-red">Chinese Supermarket Buea (CSM Buea)</span> was founded with a simple mission: to bring high‑quality electronics, reliable home appliances, and stylish home decor to the people of Cameroon.
        </p>
        <p>
          Operating out of our two locations in <strong>Buea (Molyko & St. Luke Junction)</strong>, we source premium goods directly from Chinese importers in Douala to ensure our customers get the best value for their money.
        </p>
        <div className="bg-brand-yellow/20 border-l-4 border-brand-yellow p-4 rounded-r-lg">
          <p className="text-sm font-medium text-brand-black">
            “Our goal isn't just to sell products. It's to help you build the home you've always dreamed of, with electronics and decor that last.”
          </p>
        </div>
        <p>
          Whether you are looking for a 4K Smart TV, a new washing machine, or the perfect coffee table to complete your living room—CSM Buea is your trusted partner.
        </p>
      </div>
    </div>
  );
}
