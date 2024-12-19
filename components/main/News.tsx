"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Title from "../Title";
import Button from "../Button";

import { cn } from "@/lib/utils";

import { MainNewsType, NewsType } from "@/types";

type Props = {
  data: MainNewsType[];
};
const News = ({ data }: Props) => {
  const [type, setType] = useState<NewsType>("all");

  const [parent] = useAutoAnimate();
  return (
    <section className="section bg-gray-50">
      <div className="container space-y-12">
        <Title>Our News and Tips</Title>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setType("all")}
              className={cn("pb-1 border-b", {
                "border-main-red": type === "all",
                "border-transparent hover:border-main-dark-blue":
                  type !== "all",
              })}
            >
              Show all
            </button>
            <button
              onClick={() => setType("news")}
              className={cn("pb-1 border-b", {
                "border-main-red": type === "news",
                "border-transparent hover:border-main-dark-blue":
                  type !== "news",
              })}
            >
              Only News
            </button>
            <button
              onClick={() => setType("tips")}
              className={cn("pb-1 border-b", {
                "border-main-red": type === "tips",
                "border-transparent hover:border-main-dark-blue":
                  type !== "tips",
              })}
            >
              Only Tips
            </button>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            ref={parent}
          >
            {data
              .filter((news) =>
                type === "all"
                  ? true
                  : type === "news"
                  ? !news.is_tip
                  : news.is_tip
              )
              .map((news) => (
                <Card key={news.id} {...news} />
              ))}
          </div>
        </div>

        <Button
          outlined
          rounded
          href={`/news?type=${type}`}
          className="w-fit mx-auto"
        >
          All News
        </Button>
      </div>
    </section>
  );
};

export default News;

const Card = (props: MainNewsType) => {
  return (
    <Link href={`/news/${props.slug}`} className="flex flex-col group">
      <div className="w-full aspect-[3/2] overflow-hidden relative">
        <Image
          src={props.image}
          alt={`News image - ${props.title}`}
          width={300}
          height={200}
          className="size-full object-cover group-hover:scale-105 transition-transform"
        />

        <div className="absolute inset-0 bg-main-dark-blue/40"></div>
      </div>

      <div className="flex-1 flex flex-col gap-2 p-4 bg-main-red text-white">
        <h6
          className="text-sm md:text-base font-semibold line-clamp-2"
          title={props.title}
        >
          {props.title}
        </h6>
        <p className="line-clamp-2 text-xs md:text-sm">{props.description}</p>

        <span className="text-xs md:text-sm font-semibold mt-auto">
          Read more
        </span>
      </div>
    </Link>
  );
};
