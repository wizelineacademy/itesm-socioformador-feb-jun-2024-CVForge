// Default imports
import "@/style/globals.css";

// Providers
import ReduxProvider from "./ReduxProvider";

// Components
import LeftSidebar from "./layoutComponents/LeftSidebar";

export const metadata = {
  title: 'CVForge',
  description: 'CVForge',
  keywords: ['CV, Resume, AI, ai, Linkedin, Google']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <ReduxProvider>
        <body className="pl-64 w-full h-screen">{children}</body>
      </ReduxProvider>
    </html>
  )
}
