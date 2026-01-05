import "./globals.css";
import type { Viewport, Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Background from "./components/Background/Background";
import Footer from "./components/Footer/Footer";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BusinessAuthProvider } from "./contexts/BusinessAuthContext";
import { CartProvider } from "./contexts/CartContext";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll"; // 👈 ADD THIS

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Lietuvos gipsas – Interjero dekoratoriai",
  description:
    "Lietuvos gipsas – profesionalūs interjero dekoratoriai, siūlome aukštos kokybės gipso sprendimus jūsų namams ir verslui.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt" className={inter.variable}>
      <body className="font-inter antialiased relative min-h-screen flex flex-col">
        <SmoothScroll /> {/* ✅ SMOOTH SCROLL EVERYWHERE */}

        <AuthProvider>
          <BusinessAuthProvider>
            <CartProvider>
              <MantineProvider>
                <Background />
                <Navbar />

                <main
                  role="main"
                  id="main-content"
                  className="relative z-10 pt-20 sm:pt-24 flex-grow text-slate-900"
                >
                  {children}
                </main>

                <Footer />
              </MantineProvider>
            </CartProvider>
          </BusinessAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
