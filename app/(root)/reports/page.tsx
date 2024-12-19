import Reports from "@/components/Reports";
import { Hero } from "@/components/reportsPage";

import prisma from "@/lib/db";

import { Metadata } from "next";

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar-next.vercel.app"
}/api/og/${encodeURIComponent("Photo and video reports")}`;

export const metadata: Metadata = {
  title: "Photo and video reports",
  description:
    "Photo and video materials will allow you to get acquainted with the various stages of our work",
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

export default async function ReportsPage() {
  const reports = await prisma.reports.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return (
    <>
      <Hero />

      {reports && reports.length > 0 && <Reports data={reports} isFull />}
    </>
  );
}
