import { NextResponse } from "next/server";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const checkAdmin = await useCheckAdmin();

  if (!checkAdmin.isOk) {
    return NextResponse.json({ message: checkAdmin.error }, { status: 401 });
  }

  const { items } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ message: "No services to delete" });
  }

  // Delete all services
  await Promise.all(
    items.map((serviceId: string) =>
      prisma.service.delete({ where: { id: serviceId } })
    )
  );

  // Reorder remaining services
  const remaining = await prisma.service.findMany({
    select: { id: true },
    orderBy: { order: "asc" },
  });

  await Promise.all(
    remaining.map((item, index) =>
      prisma.service.update({
        where: { id: item.id },
        data: { order: index },
      })
    )
  );

  return NextResponse.json({ message: "Services updated" });
}
