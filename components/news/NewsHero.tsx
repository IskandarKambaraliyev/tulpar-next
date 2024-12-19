import Image from "next/image";
import React from "react";
import Title from "../Title";
import Description from "../Description";

const NewsHero = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <section className="relative bg-main-dark-blue text-white">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Hero Image"
          width={1920}
          height={600}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-main-dark-blue/80" />
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

export default NewsHero;
