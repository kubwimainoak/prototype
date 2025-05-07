import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import NavbarFooterWrapper from "@/components/navigation/NavbarFooterWrapper";
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Chess League App",
  description: "Social League & Tournament Management for Chess Players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ibmPlexMono.variable} font-poppins bg-background text-foreground`}>
        <div className="min-h-screen flex flex-col">
          <NavbarFooterWrapper>
        {children}
          </NavbarFooterWrapper>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
