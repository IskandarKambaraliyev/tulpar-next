"use client";

import { ReportType } from "@/types";
import Title from "../Title";
import Button from "../Button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import { CirclePlay } from "lucide-react";

type Props = {
  data: ReportType[];
};
const Reports = ({ data }: Props) => {
  const [type, setType] = useState<"photo" | "video" | "all">("all");

  const [parent] = useAutoAnimate();
  return (
    <section className="section bg-main-dark-blue text-white">
      <div className="container space-y-12">
        <Title>Photo and Video Reports</Title>

        <div className="flex flex-col flex-wrap gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setType("all")}
              className={cn("pb-1 border-b", {
                "border-main-red": type === "all",
                "border-transparent hover:border-white": type !== "all",
              })}
            >
              Show all
            </button>
            <button
              onClick={() => setType("photo")}
              className={cn("pb-1 border-b", {
                "border-main-red": type === "photo",
                "border-transparent hover:border-white": type !== "photo",
              })}
            >
              Only Photo
            </button>
            <button
              onClick={() => setType("video")}
              className={cn("pb-1 border-b", {
                "border-main-red": type === "video",
                "border-transparent hover:border-white": type !== "video",
              })}
            >
              Only Video
            </button>
          </div>
          <div
            className="grid grid-cols-1 max-sm:gap-4 sm:grid-cols-2 md:grid-cols-4"
            ref={parent}
          >
            {data
              .filter((report) =>
                type === "all"
                  ? true
                  : type === "photo"
                  ? !report.is_video
                  : report.is_video
              )
              .map((report) => (
                <Report key={report.id} {...report} />
              ))}
          </div>
        </div>

        <Button
          rounded
          outlined
          color="white"
          href={`/reports?type=${type}`}
          className="w-fit mx-auto"
        >
          All Reports
        </Button>
      </div>
    </section>
  );
};

export default Reports;

const Report = (props: ReportType) => {
  return (
    <div className="group relative">
      <div className="w-full aspect-[3/2]">
        {props.is_video ? (
          <video src={props.src} className="size-full object-cover" />
        ) : (
          <Image
            src={props.src}
            alt={`Report image - ${props.title}`}
            width={300}
            height={200}
            className="size-full object-cover"
          />
        )}
      </div>

      <div className="opacity-100 group-hover:opacity-0 transition absolute inset-0 p-4 bg-main-dark-blue/60 flex flex-col gap-2 justify-end">
        {props.is_video && <CirclePlay className="size-6" />}
        <span className="text-xs md:text-sm">{props.title}</span>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-transparent flex-center">
        <button className="py-4 px-8 rounded-full border border-white bg-main-dark-blue/50 hover:bg-main-dark-blue/80">
          {!props.is_video ? "View photo" : "Play video"}
        </button>
      </div>
    </div>
  );
};
