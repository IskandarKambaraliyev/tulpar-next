"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  stagger,
  useAnimate,
  usePresence,
} from "motion/react";
import { EditIcon, GlobeIcon, PhoneIcon, XIcon } from "lucide-react";
import { InstagramIcon, TelegramIcon } from "./icons";
import { cn } from "@/lib/utils";
import MessageModal from "./MessageModal";

const Socials = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-28 right-4">
      <button
        onClick={() => setOpen(!open)}
        className="size-12 bg-main-red flex-center rounded-full text-white border border-white relative"
      >
        <div
          className={cn(
            "absolute z-[-1] -inset-2 bg-main-red/50 rounded-full transition",
            {
              "scale-100": open,
              "scale-0": !open,
            }
          )}
        ></div>
        <GlobeIcon />
      </button>

      <AnimatePresence>{open ? <Links key="links" /> : null}</AnimatePresence>
    </div>
  );
};

export default Socials;

const Links = () => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  const items = [
    {
      name: <InstagramIcon />,
      url: "https://instagram.com/takhirjanovich_",
      color: "pink",
    },
    { name: <PhoneIcon />, url: "tel:+998 (33) 315-55-00", color: "dark-blue" },
    {
      name: <EditIcon />,
      url: "https://linkedin.com",
      color: "green",
      spec: true,
    },
    {
      name: <TelegramIcon />,
      url: "https://t.me/Takhirjanovich",
      color: "blue",
    },
  ];

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          ".social",
          { opacity: [0, 1], y: [20, 0], scale: [0.7, 1] },
          {
            duration: 0.25,
            delay: stagger(0.1, { from: "last" }),
          }
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(
          ".social",
          { opacity: [1, 0], y: [0, 20], scale: [1, 0.7] },
          {
            duration: 0.15,
            delay: stagger(0.05),
          }
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent]);

  return (
    <>
      <div ref={scope} className="absolute bottom-16 flex flex-col gap-4">
        {items.map((item, index) =>
          item?.spec ? (
            <MessageModal key={index}>
              <button
                className={`social relative size-12 rounded-full bg-main-${item.color}`}
              >
                <div
                  className={`absolute z-[-1] -inset-1 rounded-full bg-main-${item.color} !opacity-50`}
                ></div>
                <div className="size-full rounded-full flex-center text-white border border-white">
                  {item.name}
                </div>
              </button>
            </MessageModal>
          ) : (
            <div
              className={`social relative size-12 rounded-full bg-main-${item.color}`}
              key={index}
            >
              <div
                className={`absolute z-[-1] -inset-1 rounded-full bg-main-${item.color} !opacity-50`}
              ></div>
              <a
                href={item.url}
                target="_blank"
                className="size-full rounded-full flex-center text-white border border-white"
              >
                {item.name}
              </a>
            </div>
          )
        )}
      </div>
    </>
  );
};
