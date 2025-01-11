import Main from "@/components/admin/field/Main";
import FieldHeader from "@/components/admin/FieldHeader";
import { adminAllowedFields } from "@/data";
import useFieldReplace from "@/hooks/useFieldReplace";
import prisma from "@/lib/db";
import { AllowedTypes } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return adminAllowedFields.map((field) => ({ field }));
}

type Props = {
  params: Promise<{ field: string }>;
};

export default async function AdminFieldPage({ params }: Props) {
  const { field } = await params;

  if (!adminAllowedFields.includes(field)) {
    notFound();
  }

  const type = useFieldReplace(field);

  const data = await (prisma[type as AllowedTypes] as any).findMany();

  return <Main field={field} data={data} />;
}

const pageMetadata: Record<(typeof adminAllowedFields)[number], Metadata> = {
  services: {
    title: "Services - Admin Tulpar",
    description:
      "Manage services on the website. Add, edit, or delete services to keep the content up-to-date.",
  },
  specialists: {
    title: "Specialists - Admin Tulpar",
    description:
      "Manage specialists on the website. Add, edit, or delete specialists to keep the content up-to-date.",
  },
  "price-list": {
    title: "Price List - Admin Tulpar",
    description:
      "Manage the price list on the website. Add, edit, or delete prices to keep the content up-to-date.",
  },
  reports: {
    title: "Reports - Admin Tulpar",
    description:
      "Manage reports on the website. Add, edit, or delete reports to keep the content up-to-date.",
  },
  news: {
    title: "News and Tips - Admin Tulpar",
    description:
      "Manage news and tips on the website. Add, edit, or delete news to keep the content up-to-date.",
  },
  faq: {
    title: "FAQ - Admin Tulpar",
    description:
      "Manage FAQ on the website. Add, edit, or delete questions and answers to keep the content up-to-date.",
  },
  messages: {
    title: "Messages - Admin Tulpar",
    description:
      "View messages sent by users. Respond to messages to provide support and assistance.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { field } = await params;

  if (
    !adminAllowedFields.includes(field as (typeof adminAllowedFields)[number])
  ) {
    throw new Error(`Invalid field: ${field}`);
  }

  return pageMetadata[field as (typeof adminAllowedFields)[number]];
}
