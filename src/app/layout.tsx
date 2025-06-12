import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const ptSerif = PT_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pt-serif",
});

export const metadata: Metadata = {
  title: "Moodie",
  keywords: ["mood tracker", "mood diary", "mood journal", "mood management"],
  authors: [{ name: "Aman Jain", url: "https://yourwebsite.com" }],
  creator: "Aman Jain",
  description: "A simple mood tracker app to help you manage your emotions and mental health.",
 
};  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSerif.variable} font-sans`}>
      <body  >
         <Navbar />
            {children}
        <Footer/>
        </body>
    </html>
  );
}
