import PriceList from "@/components/PriceList";
import { ServiceHero, About, Advantages } from "@/components/services";

import prisma from "@/lib/db";

import { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await prisma.service.findMany({
    select: {
      slug: true,
    },
  });

  return res.map((service) => ({
    slug: service.slug,
  }));
}

const getService = async (slug: string) => {
  return await prisma.service.findUnique({
    include: {
      priceList: true,
    },
    where: {
      slug,
    },
  });
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (service === null) {
    return {
      title: "Service not found",
      description: "Service not found",
    };
  }

  const ogImageTitle = `${
    process.env.ORIGIN_URL || "https://tulpar.stiv.uz"
  }/api/og/${encodeURIComponent(service.title)}`;

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      images: [ogImageTitle],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    throw new Error("Service not found");
  }
  return (
    <>
      <ServiceHero title={service.title} description={service.description} />

      <About image={service.image} content={service.content} />

      {service.priceList && service.priceList.length > 0 && (
        <PriceList data={service.priceList} isFull />
      )}

      <Advantages />
    </>
  );
}
