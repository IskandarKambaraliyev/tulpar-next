import Image from "next/image";

import Title from "../Title";
import Description from "../Description";

const Hero = () => {
  return (
    <section className="relative bg-main-dark-blue text-white">
      <div className="absolute inset-0">
        <Image
          src="/contacts-bg.png"
          alt="Hero Image"
          width={1920}
          height={600}
          className="size-full object-cover"
        />
      </div>

      <div className="relative pt-28 pb-20">
        <div className="container space-y-5">
          <Title>How to find us</Title>

          <Description>
            We are located in the heart of the city, near the main train station
            and bus stops. Our office is open from 9:00 to 18:00 on weekdays.
          </Description>
        </div>
      </div>
    </section>
  );
};

export default Hero;
