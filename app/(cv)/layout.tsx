// Default imports
import "@/style/globals.css";

// Providers
import ReduxProvider from "./ReduxProvider";

// Components
import LeftSidebar from "./layoutComponents/LeftSidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <ReduxProvider>
        <body className="flex bg-editorgray">
          <LeftSidebar />
          <div style={{ flex: "1" }}>{children}</div>
        </body>
      </ReduxProvider>
    </html>
  );
}
