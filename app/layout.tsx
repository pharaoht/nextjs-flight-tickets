import type { Metadata } from "next";
import styles from "./globals.module.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Cheap Flight Search",
  description: "Search for cheap flights on your next trip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
