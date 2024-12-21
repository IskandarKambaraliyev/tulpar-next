import prisma from "@/lib/db";
import Reorder from "./Reorder";
import PageHeader from "@/components/admin/PageHeader";
import List from "@/components/admin/List";

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
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col">
      <PageHeader title="All Services" count={services.length} />

      <List
        data={services}
        deleteLink="/api/admin/delete/services"
        updateLink="/api/admin/update/service-order"
        previewLink="/services"
        childLink="/admin/services"
        addLink={`/admin/services/add?redirect=/admin/services`}
      />

      {/* <Reorder initial={services} /> */}
    </div>
  );
}
