import { Suspense } from "react";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";
import Providers from "./providers";

import type { Metadata } from "next";

const ttHoves = localFont({
  src: [
    {
      path: "./fonts/TTHoves-Bold.woff2",
      style: "normal",
      weight: "700",
    },
    {
      path: "./fonts/TTHoves-BoldItalic.woff2",
      style: "italic",
      weight: "700",
    },
    {
      path: "./fonts/TTHoves-DemiBold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "./fonts/TTHoves-DemiBoldItalic.woff2",
      style: "italic",
      weight: "600",
    },
    {
      path: "./fonts/TTHoves-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "./fonts/TTHoves-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    {
      path: "./fonts/TTHoves-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/TTHoves-Italic.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-tt-hoves",
  weight: "400 700",
});

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar.stiv.uz"
}/api/og/${encodeURIComponent("Tulpar - Medical Center")}`;

export const metadata: Metadata = {
  title: "Tulpar - Medical Center",
  description:
    "Discover expert healthcare services at Tulpar Medical Center. Providing comprehensive diagnostics, advanced treatments, and compassionate care for your well-being.",
  openGraph: {
    images: [
      {
        url: ogImageTitle,
        width: 1200,
        height: 630,
        alt: "Tulpar Medical Center",
      },
    ],
  },
  metadataBase: new URL("https://tulpar.stiv.uz"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        rel: "icon",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        rel: "icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ttHoves.variable}`}>
        <div id="recap" className="hidden"></div>

        <Suspense fallback={null}>
          <NuqsAdapter>
            <Providers>{children}</Providers>
          </NuqsAdapter>
        </Suspense>
      </body>
    </html>
  );
}
