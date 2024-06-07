import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { DeleteElementProvider } from "@/contexts/DeleteElementContext";

import "./globals.css";

const vt323 = VT323({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Blob Game by Typekev",
  description: "A game by Kevin Gonzalez",
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${vt323.className} h-full flex text-black dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800`}
      >
        <ThemeProvider attribute="class">
          <DeleteElementProvider>{children}</DeleteElementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
