import Header from "@/components/layout/Header";
import StoreProvider from "@/components/StoreProvider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import PageTransition from "@/components/layout/PageTransition";
import "./globals.css";

export const metadata = {
  title: "Profit Connect",
  icons: "/logo/logo.svg",
  description:
    "A professional networking platform to connect, share, and grow your career.",
};

export default async function LocaleLayout({ children }) {
  return (
    <html>
      <body>
        <StoreProvider>
          <ThemeRegistry>
            <Header />
            <PageTransition>{children}</PageTransition>
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}