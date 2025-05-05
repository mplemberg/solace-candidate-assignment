import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";
import { Providers } from "../lib/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Health | Find a Healthcare Advocate",
  description:
    "Connect with healthcare advocates who can help you navigate the healthcare system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-white`}
      >
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
