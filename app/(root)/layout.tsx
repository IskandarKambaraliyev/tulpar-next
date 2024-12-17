import Brands from "@/components/Brands";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Socials from "@/components/Socials";
import prisma from "@/lib/db";
import { Metadata } from "next";
import React from "react";

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar-next.vercel.app"
}/api/og/${encodeURIComponent("Home Page")}`;

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: ogImageTitle,
        width: 1200,
        height: 600,
        alt: "Tulpar Next",
      },
    ],
  },
};

async function RootLayout({ children }: { children: React.ReactNode }) {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
    take: 3,
    orderBy: {
      order: "asc",
    },
  });
  return (
    <>
      <Socials />
      <Header services={services} />
      <main className="">{children}</main>

      <Brands />
      <Contacts />
      <Footer />
    </>
  );
}

export default RootLayout;
