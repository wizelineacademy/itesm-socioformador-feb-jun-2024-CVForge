// Default imports
import "@/style/globals.css";

// Providers
import ReduxProvider from "./ReduxProvider";

// Components
import LeftSidebar from "./(cv)/layoutComponents/LeftSidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <ReduxProvider>
        <body className="flex wrapper bg-transparent">
          <LeftSidebar />
          <div className="w-full">{children}</div>
        </body>
      </ReduxProvider>
    </html>
  );
}
//<div style={{ flex: "1" }}>{children}</div>
