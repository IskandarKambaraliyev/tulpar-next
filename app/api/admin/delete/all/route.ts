import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import useCheckAdmin from "@/hooks/useCheckAdmin";

export async function GET(req: Request) {
  const checkAdmin = await useCheckAdmin();

  if (!checkAdmin.isOk) {
    return NextResponse.json({ message: checkAdmin.error }, { status: 401 });
  }

  try {
    // await prisma.service.deleteMany();
    // await prisma.reports.deleteMany();
    // await prisma.specialists.deleteMany();
    // await prisma.newsAndTips.deleteMany();
    // await prisma.messages.deleteMany();
    // await prisma.priceList.deleteMany();
    // await prisma.questionAnswers.deleteMany();

    return NextResponse.json({ message: "All data deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete all data" },
      { status: 500 }
    );
  }
}
