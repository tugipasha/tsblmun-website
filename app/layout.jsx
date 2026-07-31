import "./globals.css";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TSBL MUN — Delegate Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable}`}>
      <body className="bg-bg font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
