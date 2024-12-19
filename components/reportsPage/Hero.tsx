import Image from "next/image";

import Title from "../Title";
import Description from "../Description";

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

          <Description>
            Photo and video materials will allow you to get acquainted with the
            various stages of our work
          </Description>
        </div>
      </div>
    </section>
  );
};

export default Hero;
