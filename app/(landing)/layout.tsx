import "@/style/globals.css";

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
      <body>{children}</body>
    </html>
  )
}
