import Head from "next/head"

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
      <Head>
        Head
      </Head>
      <body>asds{children}</body>
    </html>
  )
}
