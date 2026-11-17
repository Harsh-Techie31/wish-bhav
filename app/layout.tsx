import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asian, In 10 — Swish Category Launch",
  description: "A visual merchandising launch experience for Swish's new Asian food category. Five new favourites. One irresistible category.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
