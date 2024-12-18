import Brands from "@/components/Brands";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Socials from "@/components/Socials";
import prisma from "@/lib/db";
import React from "react";

async function RootLayout({ children }: { children: React.ReactNode }) {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
    take: 3,
    orderBy: {
      order: "asc",
    },
  });
  return (
    <>
      <Socials />
      <Header services={services} />
      <main className="">{children}</main>

      <Brands />
      <Contacts />
      <Footer />
    </>
  );
}

export default RootLayout;
