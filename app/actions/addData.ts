"use server";

import prisma from "@/lib/db";
import { AllowedTypes } from "@/types";

const allowedTypes = [
  "service",
  "specialists",
  "newsAndTips",
  "priceList",
  "questionAnswers",
  "reports",
];

export default async function addData(prevState: any, formData: FormData) {
  const dataObject: Record<string, any> = {};
  const type = formData.get("type") as AllowedTypes;

  if (!type) {
    return {
      error: `"type" field is required`,
    };
  } else if (!allowedTypes.includes(type)) {
    return {
      error: `Invalid type: ${type}`,
    };
  }

  for (const [key, value] of formData.entries()) {
    if (key.includes("is_") && value === "true") {
      dataObject[key] = true;
      continue;
    } else if (key === "type") {
      continue;
    }
    dataObject[key] = value;
  }

  const newState = {
    ...dataObject,
  };

  const allData = await (prisma[type] as any).findMany();

  try {
    const allData = await (prisma[type] as any).findMany();

    const data = await (prisma[type] as any).create({
      data: {
        ...newState,
        order: allData.length,
      },
    });

    return {
      error: null,
      success: true,
      message: `Data of type "${type}" added successfully!`,
    };
  } catch (error: any) {
    console.error("Error adding data:", error);

    return {
      error: `Failed to add data: ${error.message}`,
      success: false,
    };
  }
}
