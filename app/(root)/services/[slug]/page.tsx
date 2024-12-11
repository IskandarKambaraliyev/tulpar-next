import prisma from "@/lib/db";

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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    include: {
      priceList: true,
    },
    where: {
      slug,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }
  return <div>{service.title}</div>;
}
