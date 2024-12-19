import Link from "next/link";

import { CircleFadingPlus } from "lucide-react";

import prisma from "@/lib/db";

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

  const links = [
    {
      title: "Services",
      href: "/admin/services",
      count: servicesCount,
      addHref: "/admin/services/add?redirect=/admin",
      children: services.map((service) => ({
        title: service.title,
        href: `/admin/services/${service.slug}`,
      })),
    },
    {
      title: "Specialists",
      href: "/admin/specialists",
      count: specialistsCount,
      addHref: "/admin/specialists/add?redirect=/admin",
      children: specialists.map((specialist) => ({
        title: specialist.name,
        href: `/admin/specialists/${specialist.slug}`,
      })),
    },
    {
      title: "Price List",
      href: "/admin/price-list",
      count: priceListCount,
      addHref: "/admin/price-list/add?redirect=/admin",
      children: priceList.map((price) => ({
        title: `${price.name} - ${price.price}`,
        href: `/admin/price-list/${price.id}`,
      })),
    },
    {
      title: "Reports",
      href: "/admin/reports",
      count: reportsCount,
      addHref: "/admin/reports/add?redirect=/admin",
      children: reports.map((report) => ({
        title: report.title,
        href: `/admin/reports/${report.id}`,
      })),
    },
    {
      title: "News",
      href: "/admin/news",
      count: newsCount,
      addHref: "/admin/news/add?redirect=/admin",
      children: news.map((news) => ({
        title: news.title,
        href: `/admin/news/${news.slug}`,
      })),
    },
    {
      title: "FAQ",
      href: "/admin/faq",
      count: faqCount,
      addHref: "/admin/faq/add?redirect=/admin",
      children: faq.map((faq) => ({
        title: faq.question,
        href: `/admin/faq/${faq.id}`,
      })),
    },
  ];
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
      {links.map((link) => (
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
              <CircleFadingPlus className="md:size-8" />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {link.children.map((child) => (
              <Link
                href={child.href}
                key={child.href}
                className="p-4 rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                {child.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
