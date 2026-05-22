
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unnitro — Engineering Digital Ecosystems",
  description:
    "Unnitro is a Technology Holding Enterprise & Venture Studio architecting indestructible digital ecosystems. Enterprise SaaS, Agentic AI, Cloud Infrastructure.",
  keywords:
    "Unnitro, enterprise software, SaaS, AI orchestration, cloud architecture, LIMS, digital transformation",
  openGraph: {
    title: "Unnitro — Engineering Digital Ecosystems",
    description:
      "MNC Technology Holding Enterprise architecting indestructible digital ecosystems.",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
