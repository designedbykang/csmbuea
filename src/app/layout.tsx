import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './global.css'
import { CartProvider } from '@/context/CartContext'
import FixedTopContainer from '@/components/FixedTopContainer' // <-- New Import

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CSM Buea',
  description: 'Electronics, appliances, and home decor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} flex flex-col min-h-screen bg-white`}>
        <CartProvider>
          {/* The Parent Container for Marquee and Header */}
          <FixedTopContainer />
          
          {/* The Main Content Area - flows naturally below the sticky parent */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}