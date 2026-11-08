import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Agentation } from "agentation";

export const metadata: Metadata = {
  title: "Shuroq — Tech Redefined",
  description: "Empowering businesses with cutting-edge technology solutions, cloud infrastructure, and digital transformation services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          {process.env.NODE_ENV === "development" && (
            <Agentation endpoint="http://localhost:4747" />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}