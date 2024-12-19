import { Detail, NewsHero } from "@/components/news";

import prisma from "@/lib/db";

import { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await prisma.newsAndTips.findMany({
    select: {
      slug: true,
    },
  });

  return res.map((news) => ({
    slug: news.slug,
  }));
}

const getNews = async (slug: string) => {
  return await prisma.newsAndTips.findUnique({
    where: {
      slug,
    },
  });
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNews(slug);

  if (news === null) {
    return {
      title: "News not found",
      description: "News not found",
    };
  }

  const ogImageTitle = `${
    process.env.ORIGIN_URL || "https://tulpar-next.vercel.app"
  }/api/og/${encodeURIComponent(news.title)}`;

  return {
    title: news.title,
    description: news.description,
    openGraph: {
      images: [ogImageTitle],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    throw new Error("News not found");
  }

  return (
    <>
      <NewsHero
        image={news.image}
        title={news.title}
        description={news.description}
      />

      <Detail data={news} />
    </>
  );
}
