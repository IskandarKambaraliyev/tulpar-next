import Header from "@/components/Header";
import Socials from "@/components/Socials";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";
import React from "react";

const getServices = unstable_cache(
  async () => {
    return await prisma.service.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      take: 3,
    });
  },
  ["services"],
  {
    revalidate: 3600,
    tags: ["services"],
  }
);

async function RootLayout({ children }: { children: React.ReactNode }) {
  const services = await getServices();
  return (
    <>
      <Socials />
      <Header services={services} />
      <main className="">{children}</main>
    </>
  );
}

export default RootLayout;
