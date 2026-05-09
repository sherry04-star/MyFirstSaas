import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaSify | Admin Dashboard",
  description: "Modern SaaS E-commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f172a] text-slate-200 antialiased selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
