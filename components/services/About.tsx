import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  content: string;
};
const About = ({ image, content }: Props) => {
  return (
    <section className="relative bg-main-dark-blue text-white">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className="max-lg:hidden col-span-1 relative overflow-hidden">
          <Image
            src={image}
            alt="Service image"
            width={300}
            height={600}
            className="absolute inset-0 size-full object-cover"
          />

          <div className="absolute inset-0 bg-main-dark-blue/70"></div>
        </div>

        <div className="md:col-span-2 bg-white/10 py-12 px-4 md:py-20 md:px-8">
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
            className="custom-html"
          />
        </div>

        <div className="md:col-span-1 relative overflow-hidden">
          <Image
            src={image}
            alt="Service image"
            width={300}
            height={600}
            className="absolute inset-0 size-full object-cover"
          />

          <div className="absolute inset-0 bg-main-dark-blue/70"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
