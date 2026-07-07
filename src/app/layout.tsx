import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'
import { CartProvider } from '@/context/CartContext'
import BottomNav from '@/components/BottomNav'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <CartProvider>
          <div className="pb-20">
            {children}
          </div>
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  )
}