import Image from "next/image";
import React from "react";
import Title from "../Title";

const Hero = () => {
  return (
    <section className="relative bg-main-dark-blue text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/reports/bg.png"
          alt="Hero Image"
          width={1920}
          height={600}
          className="size-full object-cover"
        />
      </div>

      <div className="relative pt-28 pb-20">
        <div className="container space-y-5">
          <Title>Photo and Video Reports</Title>

          <p className="font-medium max-w-2xl">
            Photo and video materials will allow you to get acquainted with the
            various stages of our work
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
