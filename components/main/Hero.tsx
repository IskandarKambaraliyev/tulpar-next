import { CircleIcon } from "lucide-react";
import Button from "../Button";

import { cn } from "@/lib/utils";

type AtLeast<
  T,
  N extends number,
  R extends unknown[] = []
> = R["length"] extends N ? [...R, ...T[]] : AtLeast<T, N, [T, ...R]>;

type Service = {
  title: string;
  content: string;
  list: AtLeast<string, 4>;
  image: string;
};

const Hero = () => {
  const service1: Service = {
    title: "Cardio-Rehabilitation Center",
    content:
      "The Cardio-Rehabilitation Center specializes in assisting patients recovering from heart-related conditions and surgeries. Our goal is to help patients regain strength, improve heart health, and maintain an active lifestyle through personalized care.",
    list: [
      "Customized exercises to enhance cardiovascular strength and endurance.",
      "Personalized diet plans to support heart health.",
      "Techniques to manage stress and reduce its impact on heart conditions.",
      "Regular check-ups to monitor cholesterol, blood pressure, and overall heart function.",
    ],
    image: "/images/services/cardiac.png",
  };

  const service2: Service = {
    title: "Trauma-Rehabilitation Center",
    content:
      "The Trauma-Rehabilitation Center provides tailored recovery programs for patients healing from physical injuries, surgeries, or other trauma. Our aim is to restore mobility, reduce pain, and improve quality of life.",
    list: [
      "Targeted exercises to regain strength, mobility, and flexibility.",
      "Advanced therapies to alleviate acute and chronic pain.",
      "Post-surgical care for fractures, joint replacements, and spinal injuries.",
      "Support for patients recovering from strokes, head injuries, or nerve damage.",
    ],
    image: "/images/services/trauma.png",
  };
  return (
    <section className="w-full min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-5rem)] grid grid-cols-1 lg:grid-cols-2">
      <div className="lg:col-span-1 bg-main-red text-white lg:text-right flex flex-col items-start lg:items-end justify-between gap-8 md:gap-10 lg:gap-16 px-4 md:px-16 lg:px-20 py-28">
        <Info
          title={service1.title}
          content={service1.content}
          list={service1.list}
        />

        <Button rounded outlined color="white" href="/services">
          All Services
        </Button>
      </div>
      <div className="lg:col-span-1 bg-gray-50 flex flex-col items-start justify-between gap-8 md:gap-10 lg:gap-16 px-4 md:px-16 lg:px-20 py-28">
        <Info
          title={service2.title}
          content={service2.content}
          list={service2.list}
          leftSide={false}
        />

        <Button rounded outlined color="dark" href="/services">
          All Services
        </Button>
      </div>
    </section>
  );
};

export default Hero;

type InfoProps = {
  title: string;
  content: string;
  list: string[];
  leftSide?: boolean;
};
const Info = ({ title, content, list, leftSide = true }: InfoProps) => {
  return (
    <>
      <h2 className="text-lg md:text-xl lg:text-3xl font-bold">{title}</h2>

      <div className="flex flex-col gap-4">
        <p className="text-sm lg:text-base font-medium">{content}</p>

        <ul className="flex flex-col">
          {list.map((item, index) => (
            <li
              key={index}
              className={cn(
                "text-sm lg:text-base flex items-center gap-4 max-lg:justify-start",
                {
                  "lg:flex-row-reverse": leftSide,
                  "": !leftSide,
                }
              )}
            >
              <CircleIcon className="size-2" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
