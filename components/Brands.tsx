import React from "react";
import Title from "./Title";
import Image from "next/image";

const Brands = () => {
  const list = [
    "/images/brands/1.png",
    "/images/brands/2.png",
    "/images/brands/3.png",
    "/images/brands/4.png",
    "/images/brands/5.png",
  ];
  return (
    <section className="section">
      <div className="container space-y-12">
        <Title>We Are Recommended</Title>

        <div className="grid grid-cols-5 gap-4 md:gap-8 lg:gap-12">
          {list.map((item, index) => (
            <Image
              src={item}
              alt={`Brand image ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-auto object-contain"
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
