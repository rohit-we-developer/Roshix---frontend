import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Roshix Admin Dashboard",
  description: "Internal admin panel for Roshix Solutions",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0A0A0A]">{children}</div>;
}
