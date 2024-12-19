"use client";

import { cn } from "@/lib/utils";
import { MainNewsType, NewsType } from "@/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { parseAsStringEnum, useQueryState } from "nuqs";
import React, { useEffect } from "react";
import Title from "../Title";
import Link from "next/link";
import Image from "next/image";

const parseNewsType = parseAsStringEnum<NewsType>(["all", "news", "tips"]);

type Props = {
  data: MainNewsType[];
};
const News = ({ data }: Props) => {
  const [queryType, setQueryType] = useQueryState(
    "type",
    parseNewsType.withDefault("all")
  );
  const [type, setType] = React.useState<NewsType>(queryType);

  const [parent] = useAutoAnimate();

  useEffect(() => {
    setQueryType(type);
  }, [type]);
  return (
    <section className="relative bg-main-dark-blue text-white">
      <div className="sticky z-[1] top-14 md:top-20 left-0 w-full py-4 bg-[#2B3946]">
        <div className="container flex items-center flex-wrap gap-x-8 gap-y-4">
          <TypeButton
            currentType={type}
            type="all"
            title="Show all"
            onClick={() => setType("all")}
          />
          <TypeButton
            currentType={type}
            type="news"
            title="Only news"
            onClick={() => setType("news")}
          />
          <TypeButton
            currentType={type}
            type="tips"
            title="Only tips"
            onClick={() => setType("tips")}
          />
        </div>
      </div>

      <div className="container section space-y-12">
        <Title>News and Tips</Title>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden"
          ref={parent}
        >
          {data
            .filter(
              (item) => type === "all" || item.is_tip === (type === "tips")
            )
            .map((item) => (
              <NewsItem key={item.id} {...item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default News;

const NewsItem = (props: MainNewsType) => {
  return (
    <Link href={`/news/${props.slug}`} className="flex flex-col group">
      <div className="w-full aspect-[3/2] overflow-hidden">
        <Image
          src={props.image}
          alt={`News image - ${props.title}`}
          width={300}
          height={200}
          className="size-full object-cover group-hover:scale-105 transition"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col gap-2 bg-white text-main-dark-blue group-hover:bg-main-red group-hover:text-white transition">
        <h6 className="text-sm md:text-base font-semibold">{props.title}</h6>

        <p className="text-xs md:text-sm line-clamp-3">{props.description}</p>

        <span className="text-xs md:text-sm font-semibold mt-auto">
          Read more
        </span>
      </div>
    </Link>
  );
};

type TypeButtonProps = {
  type: NewsType;
  currentType: NewsType;
  title: string;
  onClick: () => void;
};
const TypeButton = ({ type, currentType, title, onClick }: TypeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("pb-1 border-b", {
        "border-main-red": type === currentType,
        "border-transparent hover:border-white": type !== currentType,
      })}
    >
      {title}
    </button>
  );
};
