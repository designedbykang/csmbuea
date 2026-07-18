import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'
import { CartProvider } from '@/context/CartContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { NotificationProvider } from '@/context/NotificationContext'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chinese Supermarket Buea',
  description: 'Electronics, Appliances, and Home Decor.',
  icons: {
    icon: '/favicon.png', // Points to your new file in public
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-dvh flex flex-col bg-white dark:bg-[#0b141a] overflow-hidden transition-colors`}>
        <ThemeProvider>
          <CartProvider>
            <NotificationProvider>
              <Header />
              <main className="flex-1 overflow-y-auto">{children}</main>
              {/* <SideMenu />  <-- REMOVED – Header already renders it correctly */}
            </NotificationProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
