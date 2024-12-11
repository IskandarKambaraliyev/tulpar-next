import prisma from "@/lib/db";
import Reorder from "./Reorder";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      order: true,
      image: true,
      slug: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  if (services.length === 0) {
    return <div>No services found</div>;
  }

  return (
    <Reorder initial={services} />
  );
}
