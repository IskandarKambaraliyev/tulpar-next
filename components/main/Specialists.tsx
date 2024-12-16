import { MainSpecialist } from "@/types";
import React from "react";
import Title from "../Title";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: MainSpecialist[];
};
const Specialists = ({ data }: Props) => {
  return (
    <section className="section bg-gray-50">
      <div className="container space-y-12">
        <Title>Our Specialists</Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {data.map((item) => (
            <Specialist key={item.id} {...item} />
          ))}
        </div>

        <Button rounded outlined href="/specialists" className="w-fit mx-auto">
          All Specialists
        </Button>
      </div>
    </section>
  );
};

export default Specialists;

const Specialist = (props: MainSpecialist) => {
  return (
    <div>
      <Link
        href={`/specialists?dr=${props.slug}`}
        className="size-16 lg:size-24 rounded-full overflow-hidden block border-2 border-gray-300 hover:border-gray-400"
      >
        <Image
          src={props.image}
          alt={`Specialist image - ${props.name}`}
          width={96}
          height={96}
          className="size-full object-cover"
        />
      </Link>

      <div className="flex flex-col gap-2">
        <h5 className="text-sm md:text-base font-semibold">{props.name}</h5>
        <p className="text-xs md:text-sm">{props.specialty}</p>
      </div>
    </div>
  );
};
