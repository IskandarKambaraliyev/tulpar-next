import Image from "next/image";
import React from "react";
import Title from "../Title";
import Description from "../Description";

type Props = {
  title: string;
  description: string;
};
const ServiceHero = ({ title, description }: Props) => {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          src="/images/services/room.png"
          alt="Hero image"
          width={1920}
          height={600}
          className="size-full object-cover"
        />
      </div>

      <div className="relative pt-28 pb-20">
        <div className="container space-y-5">
          <Title>{title}</Title>

          <Description>{description}</Description>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
