// app/layout.tsx
import './globals.css';
import type { Viewport, Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import Background from './components/Background/Background';
import { MantineProvider } from '@mantine/core';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  title: 'Lietuvos gipsas – Interjero dekoratoriai',
  description:
    'Lietuvos gipsas – profesionalūs interjero dekoratoriai, siūlome aukštos kokybės gipso sprendimus jūsų namams ir verslui.',
  keywords: [
    'Lietuvos gipsas',
    'interjero dekoratoriai',
    'gipsas',
    'interjeras',
    'dekoracija',
  ],
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter antialiased relative min-h-screen overflow-hidden" suppressHydrationWarning>
        {/* MantineProvider wraps the app for all Mantine components */}
        <MantineProvider>
          {/* Background behind everything */}
          <Background />

          {/* Fixed Navbar */}
          <Navbar />

          {/* Main content */}
          <main
            role="main"
            id="main-content"
            className="relative z-10 pt-20 sm:pt-24 min-h-screen text-slate-900"
          >
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}