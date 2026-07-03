export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      
      {/* Hero Section */}
      <section className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex text-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-6xl font-bold tracking-tight text-slate-900">
            Chinese Supermarket <span className="text-blue-600">Buea</span>
          </h1>
          <p className="text-lg max-w-2xl text-slate-600">
            Your trusted source for authentic imported electronics, household appliances, 
            and everyday gadgets, delivered right to your door in Buea, Limbe, Bamenda, Yaounde and all over Cameroon.
          </p>
          <div className="flex gap-4 mt-4">
            <a 
              href="#" 
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Start Shopping
            </a>
            <a 
              href="#" 
              className="rounded-full bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Electroics & Devices', 'Household Appliances', 'Trendy Gadgets'].map((category) => (
          <div key={category} className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
            <p className="mt-1 text-sm text-gray-500">Explore our selection of latest and popular electronics.</p>
          </div>
        ))}
      </section>

      {/* Footer Placeholder */}
      <footer className="w-full max-w-5xl mt-24 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} CSM Buea. All rights reserved.</p>
      </footer>
    </main>
  )
}