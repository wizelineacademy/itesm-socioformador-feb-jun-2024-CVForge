import "@/style/globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <body>
        <Providers>
          <Navbar/>
          <main className="relative overflow-hidden">
            {children}
          </main>
          <Footer/>
        </Providers>
      </body> 
    </html>
  )
}
