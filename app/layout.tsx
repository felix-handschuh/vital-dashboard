import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vital Parameter Dashboard — Patientenakte",
  description: "Visualisierung von Vitalparametern für Healthcare Professionals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans" style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
