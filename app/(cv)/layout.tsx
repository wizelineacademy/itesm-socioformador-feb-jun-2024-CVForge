'use client'
import '@/style/globals.css'
import ReduxProvider from './ReduxProvider'
import LeftSidebar from './layoutComponents/LeftSidebar'
import Providers from '../components/Providers'
//import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation' // Updated import statement

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const { data: session } = useSession();
  const router = useRouter() // Now correctly initialized

  return (
    <html className="scroll-smooth" lang="en">
      <ReduxProvider>
        <Providers>
          <body className="flex wrapper bg-transparent">
            <LeftSidebar />
            <div className="w-full">{children}</div>
          </body>
        </Providers>
      </ReduxProvider>
    </html>
  )
}
