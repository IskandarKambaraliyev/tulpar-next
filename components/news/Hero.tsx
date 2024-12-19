import Image from "next/image";

import Title from "../Title";
import Description from "../Description";

const Hero = () => {
  return (
    <section className="relative bg-main-dark-blue text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/news/bg.png"
          alt="Hero Image"
          width={1920}
          height={600}
          className="size-full object-cover"
        />
      </div>

      <div className="relative pt-28 pb-20">
        <div className="container space-y-5">
          <Title>Our news and tips</Title>

          <Description>
            This page provides current medical news and rehabilitation advice
          </Description>
        </div>
      </div>
    </section>
  );
};

export default Hero;
