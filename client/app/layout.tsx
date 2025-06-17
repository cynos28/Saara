import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { AuthProvider } from '../context/AuthContext';
import ClientLayout from '../app/ClientLayout';
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saara",
  description: "Your Floral Destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
          
            <ClientLayout>
              {children}
            </ClientLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
    