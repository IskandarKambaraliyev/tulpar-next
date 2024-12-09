import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { services } = await req.json();

  services.forEach(async (service: { id: string; order: number }) => {
    await prisma.service.update({
      where: { id: service.id },
      data: { order: service.order },
    });
  });

  return NextResponse.json({ message: "Services updated" });
}
