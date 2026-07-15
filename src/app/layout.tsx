import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header' // <-- Replace BottomNav with Header

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
          <div className="pb-0"> {/* Remove the pb-20 padding */}
            <Header /> {/* Header contains the SideMenu and Cart */}
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
