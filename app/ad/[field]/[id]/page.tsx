import { adminAllowedFields } from "@/data";
import useFieldReplace from "@/hooks/useFieldReplace";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const getData = async (field: string, id: string) => {
  const type = useFieldReplace(field);

  return await (prisma[type] as any).findUnique({
    where: {
      id,
    },
  });
};

type Props = {
  params: Promise<{ field: string; id: string }>;
};

export async function generateStaticParams() {
  const params = await Promise.all(
    adminAllowedFields.map(async (field) => {
      const data = await (prisma[useFieldReplace(field)] as any).findMany({
        select: {
          id: true,
        },
      });

      return data.map(({ id }: { id: string }) => ({
        id: id,
        field: field,
      }));
    })
  );

  return params.flat();
}

export default async function AdminFieldDetailPage({ params }: Props) {
  const { field, id } = await params;

  if (!adminAllowedFields.includes(field)) {
    notFound();
  }

  const data = await getData(field, id);
  return (
    <div>
      <h1>Detail Page - {data.title ?? data.name}</h1>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { field, id } = await params;

  if (!adminAllowedFields.includes(field)) {
    notFound();
  }

  const data = await getData(field, id);
  return {
    title: `${data.title ?? data.name} - Admin Tulpar`,
    description: `Manage ${data.title ?? data.name}`,
  };
}
