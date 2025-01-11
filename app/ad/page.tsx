import Link from "next/link";

import prisma from "@/lib/db";
import { CircleFadingPlusIcon } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page - Tulpar Medical Center",
  description: "Admin page for managing the website content.",
};

export default async function AdminPage() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
    },
    take: 4,
    orderBy: {
      order: "asc",
    },
  });
  const servicesCount = await prisma.service.count();

  const specialists = await prisma.specialists.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    take: 4,
    orderBy: {
      order: "asc",
    },
  });
  const specialistsCount = await prisma.specialists.count();

  const priceList = await prisma.priceList.findMany({
    take: 4,
    select: {
      id: true,
      name: true,
      price: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  const priceListCount = await prisma.priceList.count();

  const reports = await prisma.reports.findMany({
    take: 4,
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  const reportsCount = await prisma.reports.count();

  const news = await prisma.newsAndTips.findMany({
    take: 4,
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  const newsCount = await prisma.newsAndTips.count();

  const faq = await prisma.questionAnswers.findMany({
    take: 4,
    select: {
      id: true,
      question: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  const faqCount = await prisma.questionAnswers.count();

  const messages = await prisma.messages.findMany({
    take: 4,
    orderBy: {
      sendAt: "asc",
    },
  });
  const messagesCount = await prisma.messages.count();

  const LINKS = [
    {
      title: "Services",
      href: useUrl("services"),
      count: servicesCount,
      addHref: useUrl("services", true),
      children: services.map((service) => ({
        title: service.title,
        href: useUrl("services", false, service.id),
      })),
    },
    {
      title: "Specialists",
      href: useUrl("specialists"),
      count: specialistsCount,
      addHref: useUrl("specialists", true),
      children: specialists.map((specialist) => ({
        title: specialist.name,
        href: useUrl("specialists", false, specialist.id),
      })),
    },
    {
      title: "Price List",
      href: useUrl("price-list"),
      count: priceListCount,
      addHref: useUrl("price-list", true),
      children: priceList.map((price) => ({
        title: `${price.name} - ${price.price}`,
        href: useUrl("price-list", false, price.id),
      })),
    },
    {
      title: "Reports",
      href: useUrl("reports"),
      count: reportsCount,
      addHref: useUrl("reports", true),
      children: reports.map((report) => ({
        title: report.title,
        href: useUrl("reports", false, report.id),
      })),
    },
    {
      title: "News",
      href: useUrl("news"),
      count: newsCount,
      addHref: useUrl("news", true),
      children: news.map((news) => ({
        title: news.title,
        href: useUrl("news", false, news.slug),
      })),
    },
    {
      title: "FAQ",
      href: useUrl("faq"),
      count: faqCount,
      addHref: useUrl("faq", true),
      children: faq.map((faq) => ({
        title: faq.question,
        href: useUrl("faq", false, faq.id),
      })),
    },
    {
      title: "Messages",
      href: useUrl("messages"),
      count: messagesCount,
      addHref: useUrl("messages", true),
      children: messages.map((message) => ({
        title: `${message.name} - ${message.message}`,
        href: useUrl("messages", false, message.id),
      })),
    },
  ] as const;
  return (
    <div className="container pt-8 pb-20 space-y-8">
      <h1 className="font-bold text-2xl lg:text-3xl">Admin Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LINKS.map((link) => (
          <div
            className="md:col-span-1 flex flex-col gap-4 p-4 bg-white rounded-2xl border border-gray-200"
            key={link.href}
          >
            <div className="flex items-center gap-4 justify-between">
              <Link
                href={link.href}
                className="flex-1 block text-xl md:text-2xl font-semibold hover:text-main-blue"
                title={`${link.title} (${link.count})`}
              >
                {link.title} ({link.count})
              </Link>

              <Link
                href={link.addHref}
                className="hover:text-main-blue"
                title="Add new data"
              >
                <CircleFadingPlusIcon className="md:size-8" />
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              {link.children.map((child) => (
                <Link
                  href={child.href}
                  key={child.href}
                  className="p-4 rounded-lg border border-gray-200 hover:bg-gray-100 line-clamp-2"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function useUrl(
  url: string,
  add: boolean = false,
  id: string | undefined = undefined
) {
  const base = "ad";

  if (add) {
    return `/${base}/${url}/add?redirect=/${base}`;
  } else if (id) {
    return `/${base}/${url}/${id}`;
  } else {
    return `/${base}/${url}`;
  }
}
