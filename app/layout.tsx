import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Dev 2 Demos - TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
