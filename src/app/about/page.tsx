export default function AboutPage() {
  return (
    <div className="min-h-full bg-brand-bg dark:bg-[#0b141a] p-6 pb-24">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">About CSM Buea</h1>
      <div className="bg-white dark:bg-[#1f2a30] rounded-2xl shadow-sm p-6 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p><span className="font-bold text-brand-red dark:text-brand-yellow">Chinese Supermarket Buea (CSM Buea)</span> was founded with a simple mission: to bring high&apos;quality electronics, reliable home appliances, and stylish home decor to the people of Cameroon.</p>
        <p>Operating out of our two locations in <strong>Buea (Molyko &amp; St. Luke Junction)</strong>, we source premium goods directly from Chinese importers in Douala to ensure our customers get the best value for their money.</p>
        <div className="bg-brand-yellow/20 border-l-4 border-brand-yellow p-4 rounded-r-lg"><p className="text-sm font-medium text-brand-black dark:text-brand-yellow">&ldquo;Our goal isn&apos;t just to sell products. It&apos;s to help you build the home you&apos;ve always dreamed of.&rdquo;</p></div>
        <p>Whether you are looking for a 4K Smart TV, a new washing machine, or the perfect coffee table—CSM Buea is your trusted partner.</p>
      </div>
    </div>
  );
}
