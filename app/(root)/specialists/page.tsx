import Reports from "@/components/Reports";
import { Advantages } from "@/components/services";
import { Hero, Info } from "@/components/specialists";

import prisma from "@/lib/db";

import { Metadata } from "next";

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar.stiv.uz"
}/api/og/${encodeURIComponent("Our specialists")}`;

export const metadata: Metadata = {
  title: "Our Specialists",
  description:
    "Discover expert care at Tulpar Medical Center. Meet our team of highly qualified specialists dedicated to providing personalized healthcare solutions for your well-being.",
  openGraph: {
    images: [
      {
        url: ogImageTitle,
        width: 1200,
        height: 630,
        alt: "Tulpar Next",
      },
    ],
  },
};

export default async function SpecialistsPage() {
  const specialists = await prisma.specialists.findMany({
    orderBy: {
      order: "asc",
    },
  });

  const reports = await prisma.reports.findMany({
    orderBy: {
      order: "asc",
    },
    take: 8,
  });
  return (
    <>
      <Hero />

      {specialists && specialists.length > 0 && <Info data={specialists} />}

      <Advantages />

      {reports && reports.length > 0 && <Reports data={reports} />}
    </>
  );
}
