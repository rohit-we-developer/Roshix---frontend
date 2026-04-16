import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roshix Solutions Pvt. Ltd. | Digital Innovation Partner",
  description:
    "Roshix Solutions — building modern digital products, enterprise SaaS, and custom software solutions. Based in Pune, serving clients globally.",
  keywords: "Roshix, software development, SaaS, web development, mobile apps, Pune",
  openGraph: {
    title: "Roshix Solutions Pvt. Ltd.",
    description: "Your digital innovation partner",
    images: ["/images/roshix-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
