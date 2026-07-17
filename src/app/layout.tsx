import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google' // <-- Swapped to Montserrat
import './global.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'

const montserrat = Montserrat({ subsets: ['latin'] }) // <-- Using Montserrat

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
      <body className={montserrat.className}> {/* <-- Applied to body */}
        <CartProvider>
          <div className="pb-0">
            <Header />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
}