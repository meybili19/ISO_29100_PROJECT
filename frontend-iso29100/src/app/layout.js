import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geist.className} ${geistMono.className}`}>
      <body>{children}</body>
    </html>
  );
}
