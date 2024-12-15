import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { services } = await req.json();

  if (!services || services.length === 0) {
    return NextResponse.json({ message: "No services to delete" });
  }
  console.log(services);

  // Delete all services
  await Promise.all(
    services.map((serviceId: string) =>
      prisma.service.delete({ where: { id: serviceId } })
    )
  );

  // Reorder remaining services
  const remaining = await prisma.service.findMany({
    select: { id: true },
    orderBy: { order: "asc" },
  });

  await Promise.all(
    remaining.map((service, index) =>
      prisma.service.update({
        where: { id: service.id },
        data: { order: index },
      })
    )
  );

  return NextResponse.json({ message: "Services updated" });
}
