import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import Chatbot from '@/components/chatbot';

export const metadata: Metadata = {
  title: 'SYMBI0N | AI, Regenerative Design & Urban Futures Collective',
  description: 'SYMBI0N is a global collective of strategists, designers, and technologists specializing in AI-driven solutions, regenerative systems, and urban planning for a sustainable future. We partner with clients worldwide.',
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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Chatbot />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
