import type { Metadata } from "next";
import Header from "../components/Header/Header";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer/Footer";
import ThemeProvider from "../components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "../components/AuthProvider/AuthProvider";
import Toast from "../components/Toast/Toast";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel rooms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <NextAuthProvider>
        <ThemeProvider>
          <Toast />
          <main className="font-normal">
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
