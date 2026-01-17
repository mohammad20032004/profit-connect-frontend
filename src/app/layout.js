import localFont from "next/font/local";
import "./globals.css";
// ThemeRegistry ensures Emotion styles generated on the server are flushed into the HTML
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
// Header is a client component
import Header from "@/components/layout/Header";

const dubai = localFont({
  src: [
    { path: "../../public/Fonts_Dubai/Dubai-Light.ttf", weight: "300" },
    { path: "../../public/Fonts_Dubai/Dubai-Regular.ttf", weight: "400" },
    { path: "../../public/Fonts_Dubai/Dubai-Medium.ttf", weight: "500" },
    { path: "../../public/Fonts_Dubai/Dubai-Bold.ttf", weight: "700" },
  ],
  variable: "--font-dubai",
  display: "swap",
});
export const metadata = {
  title: "Profit Connect",
  icons: "/logo/logo.svg",
  description: "A professional networking platform to connect, share, and grow your career.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dubai.variable}>
      <body className={dubai.className}>
        <ThemeRegistry>
                      <Header />

        
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
