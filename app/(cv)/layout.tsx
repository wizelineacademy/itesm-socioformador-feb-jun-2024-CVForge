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
        <div className = "fixed"> 
          <div className = "fixed"> 
        <LeftSidebar />
        </div>
        </div>
        
        <body className="ml-64">{children}</body>
      </ReduxProvider>
    </html>
  )
}