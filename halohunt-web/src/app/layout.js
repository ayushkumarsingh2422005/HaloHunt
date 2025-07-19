import { Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { AuthProvider } from "./context/AuthContext";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "HaloHunt - Shop and Sell",
  description: "HaloHunt e-commerce platform",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8SVD2R6VJD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8SVD2R6VJD');
          `}
        </Script>
      </head>
      <body className={geist.className}>
        <AuthProvider>
        <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
