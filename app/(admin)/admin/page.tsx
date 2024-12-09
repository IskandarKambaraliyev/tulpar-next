import prisma from "@/lib/db";
import Link from "next/link";

export default async function AdminPage() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
    take: 4,
    orderBy: {
      order: "asc",
    },
  });

  const servicesCount = await prisma.service.count();

  const specialists = await prisma.specialists.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    take: 4,
    orderBy: {
      order: "asc",
    },
  });

  const specialistsCount = await prisma.specialists.count();

  const priceList = await prisma.priceList.findMany({
    take: 4,
    orderBy: {
      order: "asc",
    },
  });

  const priceListCount = prisma.priceList.count();
  return (
    <div className="container flex flex-col gap-4 pt-4 pb-20">
      <div className="w-full">
        <Link
          href="/admin/services"
          className="text-2xl font-semibold hover:text-main-red"
        >
          Services ({servicesCount})
        </Link>

        <ul>
          {services.length > 0 ? (
            services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/admin/services/${service.slug}`}
                  className="p-2 block border border-gray-300 hover:bg-gray-100"
                >
                  {service.title}
                </Link>
              </li>
            ))
          ) : (
            <li>No services found</li>
          )}
        </ul>
      </div>
      <div className="w-full">
        <Link
          href="/admin/specialists"
          className="text-2xl font-semibold hover:text-main-red"
        >
          Services ({specialistsCount})
        </Link>

        <ul>
          {specialists.length > 0 ? (
            specialists.map((specialist) => (
              <li key={specialist.id}>
                <Link
                  href={`/admin/specialists/${specialist.slug}`}
                  className="p-2 block border border-gray-300 hover:bg-gray-100"
                >
                  {specialist.name}
                </Link>
              </li>
            ))
          ) : (
            <li>No specialists found</li>
          )}
        </ul>
      </div>
      <div className="w-full">
        <Link
          href="/admin/price-list"
          className="text-2xl font-semibold hover:text-main-red"
        >
          Price List ({priceListCount})
        </Link>

        <ul>
          {priceList.length > 0 ? (
            priceList.map((price) => (
              <li key={price.id}>
                <Link
                  href={`/admin/price-list/${price.id}`}
                  className="p-2 block border border-gray-300 hover:bg-gray-100"
                >
                  {price.name} - {price.price}
                </Link>
              </li>
            ))
          ) : (
            <li>No price list found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
