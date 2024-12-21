import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import useCheckAdmin from "@/hooks/useCheckAdmin";

export async function POST(req: Request) {
  const checkAdmin = await useCheckAdmin();

  if (!checkAdmin.isOk) {
    return NextResponse.json({ message: checkAdmin.error }, { status: 401 });
  }

  const { items } = await req.json();

  if (!items || !Array.isArray(items)) {
    return NextResponse.json(
      { message: "items list is not provided" },
      { status: 400 }
    );
  }

  const oldServices = await prisma.service.findMany({
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });

  for (const service of items) {
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
    providedServices: items,
  });
}
