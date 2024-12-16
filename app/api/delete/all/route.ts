import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // await prisma.service.deleteMany();
    // await prisma.reports.deleteMany();
    // await prisma.specialists.deleteMany();
    // await prisma.newsAndTips.deleteMany();
    // await prisma.messages.deleteMany();
    // await prisma.priceList.deleteMany();
    // await prisma.questionAnswers.deleteMany();

    return NextResponse.json({ message: "All services deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete all services" },
      { status: 500 }
    );
  }
}
