import Image from "next/image";
import React from "react";
import Title from "../Title";

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          src="/images/services/bg.png"
          alt="Hero Image"
          width={1920}
          height={600}
          className="size-full object-cover"
        />
      </div>

      <div className="relative pt-28 pb-20">
        <div className="container space-y-5">
          <Title>Our Services</Title>

          <p className="font-medium max-w-2xl">
            An age-appropriate comprehensive medical examination provides an
            accurate picture of the patient's health status and is tailored to
            each patient's individual needs, based on their risks, professional
            activities and personal situation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
