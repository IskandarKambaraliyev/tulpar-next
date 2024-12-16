import { PriceListType } from "@/types";
import React from "react";
import Title from "../Title";
import Button from "../Button";
import { cn } from "@/lib/utils";

type Props = {
  data: PriceListType[];
};
const PriceList = ({ data }: Props) => {
  return (
    <section className="section bg-white">
      <div className="container space-y-12">
        <Title>Price List</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16">
          <Lists data={data.slice(0, 5)} className="max-md:hidden" />
          <Lists data={data.slice(5)} className="max-md:hidden" />

          <Lists data={data} className="md:hidden" />
        </div>

        <Button rounded outlined href="/price-list" className="w-fit mx-auto">
          All Price List
        </Button>
      </div>
    </section>
  );
};

export default PriceList;

type ListsProps = {
  data: PriceListType[];
  className?: string;
};
const Lists = ({ data, className }: ListsProps) => {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs md:text-sm font-semibold">Service name</span>
        <span className="text-xs md:text-sm font-semibold">Price</span>
      </div>
      <ul className="flex flex-col gap-4">
        {data.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4">
            <span className="text-sm md:text-base text-slate-400 font-medium">{item.name}</span>
            <span className="text-sm md:text-base text-slate-500 font-semibold">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
