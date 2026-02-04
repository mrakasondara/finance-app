import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: {
    template: "%s | Arthavo",
    default: "Arthavo",
  },
  description: "Arthavo A Simple Finance App",
  keywords: ["Next.js", "React", "JavaScript", "Arthavo", "mrakasondara"],
  authors: { name: "mrakasondara", url: "https://mrakasondara.netlify.app/" },
  creator: "mrakasondara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Arthavo" />
      </head>
      <body className={`${poppins.className} antialiased bg-table`}>
        <Providers>
          <Toaster position="top-right" />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
