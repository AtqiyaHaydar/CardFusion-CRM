import { Inter } from "next/font/google";
import "./globals.css";
import SnowBackground from "@/components/SnowBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CardFusion CRM",
  description: "Customer Relationship Manager.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="satoshi">
        <SnowBackground>
          {children}
        </SnowBackground>
      </body>
    </html>
  );
}
