import { Metadata } from "next";

import { Hero, Services, Specialists, News, Faq } from "@/components/main";
import PriceList from "@/components/PriceList";
import Reports from "@/components/Reports";

import prisma from "@/lib/db";

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar-next.vercel.app"
}/api/og/${encodeURIComponent("Home Page")}`;

export const metadata: Metadata = {
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

export default async function HomePage() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      slug: true,
    },
    orderBy: {
      order: "asc",
    },
    take: 4,
  });

  const specialists = await prisma.specialists.findMany({
    select: {
      id: true,
      name: true,
      specialty: true,
      image: true,
      slug: true,
    },
    orderBy: {
      order: "asc",
    },
    take: 4,
  });

  const priceList = await prisma.priceList.findMany({
    orderBy: {
      order: "asc",
    },
    take: 10,
  });

  const reports = await prisma.reports.findMany({
    orderBy: {
      order: "asc",
    },
    take: 8,
  });

  const news = await prisma.newsAndTips.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      slug: true,
      is_tip: true,
    },
    orderBy: {
      order: "asc",
    },
    take: 4,
  });

  const faq = await prisma.questionAnswers.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return (
    <>
      <Hero />

      {services && services.length > 0 && <Services data={services} />}

      {specialists && specialists.length > 0 && (
        <Specialists data={specialists} />
      )}

      {priceList && priceList.length > 0 && <PriceList data={priceList} />}

      {reports && reports.length > 0 && <Reports data={reports} />}

      {news && news.length > 0 && <News data={news} />}

      {faq && faq.length > 0 && <Faq data={faq} />}
    </>
  );
}
