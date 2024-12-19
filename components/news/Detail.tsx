import { NewsDetailType } from "@/types";
import Link from "next/link";
import React from "react";
import { TriggerIcon } from "../icons";

type Props = {
  data: NewsDetailType;
};
const Detail = ({ data }: Props) => {
  const breadcrumbs = [
    {
      label: "Home Page",
      link: "/",
    },
    {
      label: "Our news and tips",
      link: "/news",
    },
    {
      label: data.title,
      link: `/news/${data.slug}`,
    },
  ];
  return (
    <section className="relative bg-gray-50">
      <div className="sticky z-[1] top-14 md:top-20 left-0 w-full py-4 bg-[#2B3946]">
        <div className="container flex flex-wrap items-center gap-4">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <Link
                href={item.link}
                className="text-white font-medium hover:opacity-80"
              >
                {item.label}
              </Link>

              {index + 1 !== breadcrumbs.length && (
                <TriggerIcon className="-rotate-90 text-main-red size-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative section">
        <div className="container">
          <div
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
            className="custom-html"
          />
        </div>
      </div>
    </section>
  );
};

export default Detail;
