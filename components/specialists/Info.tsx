"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

import { useQueryState } from "nuqs";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

import { SpecialistsType } from "@/types";

type Props = {
  data: SpecialistsType[];
};
const Info = ({ data }: Props) => {
  const [dr, setDr] = useQueryState("dr");
  const [specialist, setSpecialist] = useState<SpecialistsType | null>(null);

  useEffect(() => {
    if (!dr) {
      setSpecialist(null);
    } else {
      const foundSpecialist = data.find((item) => item.slug === dr) || null;
      setSpecialist(foundSpecialist);
    }
  }, [dr]);
  return (
    <section className="section bg-gray-50">
      <div className="container space-y-12">
        <div className="grid grid-cols-3 md:flex flex-wrap items-start gap-x-4 md:gap-x-12 gap-y-8">
          {data.map((item) => (
            <SpecialistButton
              key={item.id}
              specialist={item}
              onClick={() => setDr(item.slug)}
              active={specialist?.slug === item.slug}
            />
          ))}
        </div>

        <AnimatePresence>
          {specialist && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="flex flex-col gap-8"
            >
              <DetailWrapper>
                <DetailTitle>Full name</DetailTitle>
                <DetailDescription>{specialist.name}</DetailDescription>
              </DetailWrapper>
              <DetailWrapper>
                <DetailTitle>Job title</DetailTitle>
                <DetailDescription>{specialist.job_title}</DetailDescription>
              </DetailWrapper>
              <DetailWrapper>
                <DetailTitle>Speciality</DetailTitle>
                <DetailDescription>{specialist.specialty}</DetailDescription>
              </DetailWrapper>
              <DetailWrapper>
                <DetailTitle>Career</DetailTitle>
                <DetailDescription>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: specialist.career,
                    }}
                    className="custom-html"
                  />
                </DetailDescription>
              </DetailWrapper>
              <DetailWrapper>
                <DetailTitle>Experience</DetailTitle>
                <DetailDescription>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: specialist.experience,
                    }}
                    className="custom-html"
                  />
                </DetailDescription>
              </DetailWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Info;

type SpecialistButtonProps = {
  specialist: SpecialistsType;
  active: boolean;
  onClick: () => void;
};
const SpecialistButton = ({
  specialist,
  active,
  onClick,
}: SpecialistButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 items-center"
      title={`${specialist.name} - ${specialist.job_title}`}
    >
      <div
        className={cn(
          "p-1 md:p-2 rounded-full size-4/5 md:size-28 overflow-hidden",
          {
            "bg-main-red/60": active,
            "bg-transparent": !active,
          }
        )}
      >
        <Image
          src={specialist.image}
          alt={`Specialist image - ${specialist.name}`}
          width={112}
          height={112}
          className={cn("size-full object-cover rounded-full border ", {
            "border-transparent": active,
            "border-gray-300": !active,
          })}
        />
      </div>

      <span
        className={cn("text-sm md:text-base font-semibold", {
          "text-main-red": active,
        })}
      >
        {specialist.name}
      </span>
    </button>
  );
};

const DetailWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex max-md:flex-col gap-x-8 gap-y-4">{children}</div>;
};

const DetailTitle = ({ children }: { children: ReactNode }) => {
  return <h6 className="font-semibold text-main-red min-w-24">{children}:</h6>;
};

const DetailDescription = ({ children }: { children: ReactNode }) => {
  return <div className="">{children}</div>;
};
