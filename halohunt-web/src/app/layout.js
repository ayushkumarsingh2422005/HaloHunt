import { Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { AuthProvider } from "./context/AuthContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "HaloHunt - Shop and Sell",
  description: "HaloHunt e-commerce platform",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
