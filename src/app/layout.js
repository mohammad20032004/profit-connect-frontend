import Header from "@/components/layout/Header";
import StoreProvider from '@/components/StoreProvider';
import localFont from "next/font/local";
import "./globals.css";


export const metadata = {
  title: "Profit Connect",
  icons: "/logo/logo.svg",
  description: "A professional networking platform to connect, share, and grow your career.",
};

export default async function LocaleLayout({ children }) {
  return (
    <html>
      <body>
        <StoreProvider>
            <Header />
            {children}
        </StoreProvider>
      </body>
    </html>
  );
}