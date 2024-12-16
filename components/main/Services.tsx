import { MainService } from "@/types";
import React from "react";
import Title from "../Title";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

type Props = {
  data: MainService[];
};
const Services = ({ data }: Props) => {
  return (
    <section className="section bg-main-dark-blue text-white">
      <div className="container space-y-12">
        <Title>Our Services</Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {data.map((item) => (
            <Service key={item.id} {...item} />
          ))}
        </div>

        <Button
          href="/services"
          rounded
          outlined
          color="white"
          className="w-fit mx-auto"
        >
          All Services
        </Button>
      </div>
    </section>
  );
};

export default Services;

const Service = (props: MainService) => {
  return (
    <Link
      href={`/service/${props.slug}`}
      className="relative overflow-hidden service-card"
    >
      <div className="aspect-square w-full">
        <Image
          src={props.image}
          alt={`Service - ${props.title}`}
          width={280}
          height={280}
          className="size-full object-cover"
        />
      </div>
      <div className="p-4">
        <h5 className="text-sm font-semibold">{props.title}</h5>
      </div>
      <div className="content absolute inset-0 bg-main-dark-blue/60 flex items-end transition">
        <div className="info mt-auto p-4 bg-main-red transition flex flex-col gap-4">
          <h5 className="text-sm sm:text-base font-semibold">{props.title}</h5>
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
    </Link>
  );
};
