// Default imports
import "@/style/globals.css";

// Providers
import ReduxProvider from "./ReduxProvider";

// Components
import LeftSidebar from "./layoutComponents/LeftSidebar";

// Session Provider
import Providers from "../components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
  );
}

