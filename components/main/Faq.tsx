"use client";

import { FaqType } from "@/types";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";

type Props = {
  data: FaqType[];
};
const Faq = ({ data }: Props) => {
  const [active, setActive] = useState<string>(data[0].id);
  const [answer, setAnswer] = useState<FaqType>(data[0]);

  useEffect(() => {
    const item = data.find((item) => item.id === active);
    if (item) {
      setAnswer(item);
    }
  }, [active]);
  return (
    <section className="section bg-main-dark-blue text-white space-y-12">
      <div className="w-full bg-[#49647D] py-4">
        <div className="container">
          <Title>Question and Answer</Title>
        </div>
      </div>

      <div className="container">
        <div className="max-lg:hidden grid grid-cols-3 gap-20">
          <div className="col-span-1 flex flex-col gap-5">
            {data.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="text-left flex items-start gap-4 justify-between"
              >
                <span className="flex-1 text-sm md:text-base font-medium">
                  {item.question}
                </span>

                <div
                  className={cn(
                    "size-6 rounded-full flex-center transition shrink-0",
                    {
                      "bg-main-red rotate-0": active === item.id,
                      "bg-[#49647D] rotate-180": active !== item.id,
                    }
                  )}
                >
                  <ArrowRightIcon className="size-4" />
                </div>
              </button>
            ))}
          </div>
          <div className="col-span-2 space-y-8">
            <h6 className="text-base md:text-lg font-semibold">
              {answer.question}
            </h6>

            <div
              dangerouslySetInnerHTML={{
                __html: answer.answer,
              }}
              className="custom-html"
            />
          </div>
        </div>

        <div className="lg:hidden">
          <Accordion type="single">
            {data.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left justify-between py-2">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="bg-[#49647D] p-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                    className="custom-html"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
