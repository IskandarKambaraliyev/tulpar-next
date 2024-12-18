import PriceList from "@/components/PriceList";
import Reports from "@/components/Reports";
import { Advantages, Hero, Services } from "@/components/services";
import Title from "@/components/Title";
import prisma from "@/lib/db";
import { Metadata } from "next";
import React from "react";

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar-next.vercel.app"
}/api/og/${encodeURIComponent("Home Page")}`;

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "An age-appropriate comprehensive medical examination provides an accurate picture of the patient's health status and is tailored to each patient's individual needs, based on their risks, professional activities and personal situation.",
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

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      image: true,
      description: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  const priceList = await prisma.priceList.findMany({
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

      {services && services.length > 0 ? (
        <Services data={services} />
      ) : (
        <section className="section">
          <Title>No Services</Title>
        </section>
      )}

      {priceList && priceList.length > 0 && (
        <PriceList data={priceList} isFull />
      )}

      <Advantages />

      {reports && reports.length > 0 && <Reports data={reports} />}
    </>
  );
}
