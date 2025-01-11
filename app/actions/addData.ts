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
  const list = formData.get("list") as string | null;

  if (!type) {
    return { error: `"type" field is required` };
  } else if (!allowedTypes.includes(type)) {
    return { error: `Invalid type: ${type}` };
  } else if (type !== "service" && type !== "priceList" && list) {
    return {
      error: `List field is only allowed for "service" and "priceList" types only`,
    };
  }

  for (const [key, value] of formData.entries()) {
    if (key.includes("is_") && value === "true") {
      dataObject[key] = true;
      continue;
    } else if (key === "type" || key === "list") {
      continue;
    }
    dataObject[key] = value;
  }

  const newState = { ...dataObject };

  if (Object.keys(newState).length === 0) {
    return { error: "Data object is empty or invalid." };
  }

  try {
    const allData = await (prisma[type] as any).findMany();

    if ((type === "service" || type === "priceList") && list) {
      const lists = list.split(",").filter((id) => id.trim() !== "");
      if (lists.length === 0) {
        return { error: "List is invalid or empty." };
      }

      await (prisma[type] as any).create({
        data: {
          ...newState,
          order: allData.length,
          [type === "service" ? "priceList" : "services"]: {
            connect: lists.map((id: string) => ({
              id: id,
            })),
          },
        },
      });
    } else {
      await (prisma[type] as any).create({
        data: {
          ...newState,
          order: allData.length,
        },
      });
    }

    return {
      error: null,
      success: true,
      message: `Data of type "${type}" added successfully!`,
    };
  } catch (error: any) {
    console.error("Error adding data:", error);
    return { error: `Failed to add data: ${error.message}`, success: false };
  }
}
