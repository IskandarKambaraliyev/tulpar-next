import { Hero, News } from "@/components/news";

import prisma from "@/lib/db";

import { Metadata } from "next";

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar.stiv.uz"
}/api/og/${encodeURIComponent("Our news and tips")}`;

export const metadata: Metadata = {
  title: "Our news and tips",
  description:
    "This page provides current medical news and rehabilitation advice",
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

export default async function NewsPage() {
  const news = await prisma.newsAndTips.findMany({
    select: {
      id: true,
      title: true,
      image: true,
      description: true,
      is_tip: true,
      slug: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <>
      <Hero />
      <News data={news} />
    </>
  );
}
