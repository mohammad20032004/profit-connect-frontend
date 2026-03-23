import Header from "@/components/layout/Header";
import StoreProvider from "@/components/StoreProvider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import PageTransition from "@/components/layout/PageTransition";
import AOSProvider from "@/components/layout/AOSProvider";
import "./globals.css";
import "aos/dist/aos.css";

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
            <AOSProvider>
              <Header />
              <PageTransition>{children}</PageTransition>
            </AOSProvider>
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
