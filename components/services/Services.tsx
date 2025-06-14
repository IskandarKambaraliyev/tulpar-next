"use client";

import Link from "next/link";
import Image from "next/image";

import { ServicesServiceType } from "@/types";

import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  data: ServicesServiceType[];
  width?: number;
};
const Services = ({ data, width }: Props) => {
  const [parent] = useAutoAnimate();
  return (
    <section className="bg-main-dark-blue text-white">
      <div
        className={cn("container grid", styles.servicesContainer, {
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-4": !width,
          "grid-cols-4": width && width,
          "grid-cols-2": width && width < 768,
          "grid-cols-1": width && width < 640,
        })}
        ref={parent}
      >
        {data.map((service) => (
          <Service key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;

const Service = (props: ServicesServiceType) => {
  return (
    <Link
      href={`/services/${props.slug}`}
      className={`${styles.card} block relative group`}
    >
      <div className="w-full aspect-[1/1.1] overflow-hidden">
        <Image
          src={props.image}
          alt={`Service image - ${props.title}`}
          width={300}
          height={400}
          className="size-full object-cover"
        />
      </div>

      <div
        className={`${styles.overlay} absolute inset-0 bg-main-dark-blue/70 flex items-end p-4 opacity-100 group-hover:opacity-0 transition duration-300`}
      >
        <h6 className="text-sm md:text-base font-semibold">{props.title}</h6>
      </div>

      <div
        className={`${styles.content} absolute inset-0 flex items-end bg-transparent opacity-0 group-hover:opacity-100 transition duration-300 overflow-hidden`}
      >
        <div
          className={`${styles.info} flex flex-col gap-2 p-4 bg-main-red w-full max-h-[70%] overflow-hidden translate-y-full group-hover:translate-y-0 transition duration-300`}
        >
          <h6 className="text-sm md:text-base font-semibold">{props.title}</h6>
          <p className="text-xs md:text-sm">{props.description}</p>
        </div>
      </div>
    </Link>
  );
};
