"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CirclePlay } from "lucide-react";

import { cn } from "@/lib/utils";

import Title from "./Title";
import Button from "./Button";
import Lines from "./Lines";

import { MediaType, ReportType } from "@/types";

type Props = {
  data: ReportType[];
  isFull?: boolean;
};

const parseMediaType = parseAsStringEnum<MediaType>(["all", "photo", "video"]);

const Reports = ({ data, isFull = false }: Props) => {
  const [queryType, setQueryType] = useQueryState(
    "type",
    parseMediaType.withDefault("all")
  );
  const [type, setType] = useState<MediaType>(queryType);

  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (isFull) {
      setQueryType(type);
    }
  }, [type]);
  return (
    <section
      className={cn("bg-main-dark-blue text-white relative", {
        section: !isFull,
      })}
    >
      {!isFull && <Lines color="dark" />}

      {isFull && (
        <div className="sticky top-14 md:top-20 left-0 py-4 bg-[#2B3946] z-[1]">
          <div className="container">
            <div className="flex items-center gap-4">
              <TypeButton
                currentType={type}
                type={"all"}
                title="Show all"
                onClick={() => setType("all")}
              />
              <TypeButton
                currentType={type}
                type={"photo"}
                title="Only Photo"
                onClick={() => setType("photo")}
              />
              <TypeButton
                type={"video"}
                currentType={type}
                title="Only Video"
                onClick={() => setType("video")}
              />
            </div>
          </div>
        </div>
      )}

      <div
        className={cn("container space-y-12 relative", {
          section: isFull,
        })}
      >
        {!isFull && <Title>Photo and Video Reports</Title>}

        <div className="flex flex-col flex-wrap gap-4 md:gap-8">
          {!isFull && (
            <div className="flex items-center gap-4">
              <TypeButton
                currentType={type}
                type={"all"}
                title="Show all"
                onClick={() => setType("all")}
              />
              <TypeButton
                currentType={type}
                type={"photo"}
                title="Only Photo"
                onClick={() => setType("photo")}
              />
              <TypeButton
                type={"video"}
                currentType={type}
                title="Only Video"
                onClick={() => setType("video")}
              />
            </div>
          )}
          <div
            className="grid grid-cols-1 max-sm:gap-4 sm:grid-cols-2 md:grid-cols-4 overflow-hidden"
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

        {!isFull && (
          <Button
            rounded
            outlined
            color="white"
            href={`/reports?type=${type}`}
            className="w-fit mx-auto"
          >
            All Reports
          </Button>
        )}
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

type TypeButtonProps = {
  type: MediaType;
  currentType: MediaType;
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
