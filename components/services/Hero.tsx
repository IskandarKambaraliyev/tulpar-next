import Image from "next/image";

import Title from "../Title";
import Description from "../Description";

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

          <Description>
            An age-appropriate comprehensive medical examination provides an
            accurate picture of the patient's health status and is tailored to
            each patient's individual needs, based on their risks, professional
            activities and personal situation.
          </Description>
        </div>
      </div>
    </section>
  );
};

export default Hero;
