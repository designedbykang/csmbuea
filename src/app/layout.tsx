import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './global.css'
import { CartProvider } from '@/context/CartContext'
import FixedTopContainer from '@/components/FixedTopContainer'

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
          <FixedTopContainer />
          <main className="flex-1 w-full">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}