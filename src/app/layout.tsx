import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './global.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import SideMenu from '@/components/SideMenu'

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
      {/* The body is a fixed 100dvh flex container */}
      <body className={`${montserrat.className} h-dvh flex flex-col bg-white overflow-hidden`}>
        <CartProvider>
          {/* The Header sits at the top and never moves */}
          <Header />
          
          {/* The main content area is flex-1 and scrolls independently */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          
          {/* The Drawer sits over the entire app */}
          <SideMenu />
        </CartProvider>
      </body>
    </html>
  )
}