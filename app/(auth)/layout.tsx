// Default imports
import '@/style/globals.css'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">{children}</div>
      </body>
    </html>
  )
}
//{children}
