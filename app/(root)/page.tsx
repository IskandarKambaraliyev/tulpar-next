import { Hero, Services, Specialists, PriceList, Reports } from "@/components/main";
import prisma from "@/lib/db";

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
  return (
    <>
      <Hero />
      {services && services.length > 0 && <Services data={services} />}
      {specialists && specialists.length > 0 && (
        <Specialists data={specialists} />
      )}
      {priceList && priceList.length > 0 && <PriceList data={priceList} />}
      {reports && reports.length > 0 && <Reports data={reports} />}
    </>
  );
}
