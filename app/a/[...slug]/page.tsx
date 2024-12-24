import AddForm from "@/components/admin/AddForm";
import prisma from "@/lib/db";
import { AllowedTypes } from "@/types";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const allowedTypes = [
    "service",
    "specialists",
    "newsAndTips",
    "messages",
    "priceList",
    "questionAnswers",
    "reports",
  ];

  if (slug.length > 3 || !allowedTypes.includes(slug[0])) {
    notFound();
  } else if (slug.length === 2 && slug[1] === "add") {
    return AddPage(slug[0] as AllowedTypes);
  }

  return (
    <div>
      <pre>{slug}</pre>
    </div>
  );
}

async function AddPage(type: AllowedTypes) {
  if (!prisma[type] || type === "messages") {
    notFound();
  }

  const data = await (prisma[type] as any).findMany();
  let servicesData: {
    id: string;
    title: string;
  }[] = [];
  let priceListData: {
    id: string;
    name: string;
  }[] = [];

  if (type === "service") {
    servicesData = await prisma.service.findMany({
      select: {
        id: true,
        title: true,
      },
    });
  } else if (type === "priceList") {
    priceListData = await prisma.priceList.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  const dataFields = useDataFields(type);
  return (
    <div className="flex-1 flex-center pt-8 pb-20">
      <AddForm
        type={type}
        data={dataFields}
        services={servicesData}
        priceList={priceListData}
      />
    </div>
  );
}

const useDataFields = (type: AllowedTypes) => {
  switch (type) {
    case "service":
      return {
        slug: "string",
        title: "string",
        description: "string",
        image: "string",
        additional_image: "string",
        content: "html",
      };
    case "specialists":
      return {
        slug: "string",
        name: "string",
        image: "string",
        job_title: "string",
        specialty: "string",
        career: "html",
        experience: "html",
      };
    case "newsAndTips":
      return {
        slug: "string",
        title: "string",
        image: "string",
        description: "string",
        content: "html",
        is_tip: "boolean",
      };
    case "priceList":
      return {
        name: "string",
        price: "string",
      };
    case "questionAnswers":
      return {
        question: "string",
        answer: "string",
      };
    case "reports":
      return { title: "string", src: "string", is_video: "boolean" };
    default:
      return {};
  }
};
