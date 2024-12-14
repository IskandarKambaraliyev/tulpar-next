import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { services } = await req.json();

  if (!services || !Array.isArray(services)) {
    return NextResponse.json(
      { message: "Services list is not provided" },
      { status: 400 }
    );
  }

  const oldServices = await prisma.service.findMany({
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });

  for (const service of services) {
    await prisma.service.update({
      where: { id: service.id },
      data: { order: service.order },
    });
  }

  const updatedServices = await prisma.service.findMany({
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });

  const difference = oldServices.map((oldItem) => {
    const currItem = updatedServices.find((item) => item.id === oldItem.id);

    return {
      id: oldItem.id,
      "old-order": oldItem.order,
      "new-order": currItem?.order || "undefined",
    };
  });

  return NextResponse.json({
    message: "Services updated",
    difference,
    oldServices,
    updatedServices,
    providedServices: services,
  });
}
