import "@/style/globals.css";
import 'intersection-observer';
import Providers from "../components/Providers";
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
      <body className="flex flex-col bg-gradient-to-b from-white to-gray-300 h-screen">
        <Providers>
        <Navbar/>
          <div className="overflow-y-scroll">
            <main>
              {children}
            </main>
            <Footer/>
          </div>
        </Providers>
      </body> 
    </html>
  )
}
