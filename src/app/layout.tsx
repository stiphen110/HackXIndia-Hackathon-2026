import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Suvidha Sahayak',
  description: 'Your friendly guide to Indian government schemes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <AccessibilityProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Chatbot />
          <Toaster />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
