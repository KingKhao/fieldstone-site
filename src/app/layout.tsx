import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const TITLE = "Fieldstone Kitchen & Bath Co. | Knoxville Kitchen & Bath Remodeling";
const DESCRIPTION =
  "Design-build kitchen and bathroom remodeling in Knoxville, TN. Get a free project estimate in minutes — Fieldstone designs and builds renovations built to be lived in.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fieldstone-site.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/images/hero-kitchen.jpg", width: 1920, height: 1280, alt: "A warm, finished farmhouse-style kitchen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/hero-kitchen.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans antialiased flex min-h-screen flex-col bg-paper text-charcoal`}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
