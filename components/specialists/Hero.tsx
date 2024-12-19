import Image from "next/image";

import Title from "../Title";
import Description from "../Description";

const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          src="/images/specialists/bg.png"
          alt="Hero Image"
          width={1920}
          height={600}
          className="size-full object-cover"
        />
      </div>

      <div className="relative pt-28 pb-20">
        <div className="container space-y-5">
          <Title>Our Specialists</Title>

          <Description>
            Discover expert care at Tulpar Medical Center. Meet our team of
            highly qualified specialists dedicated to providing personalized
            healthcare solutions for your well-being.
          </Description>
        </div>
      </div>
    </section>
  );
};

export default Hero;
