"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  stagger,
  useAnimate,
  useAnimationControls,
  usePresence,
  motion,
} from "motion/react";
import { EditIcon, GlobeIcon, PhoneIcon, XIcon } from "lucide-react";
import { InstagramIcon, TelegramIcon } from "./icons";
import { cn } from "@/lib/utils";
import MessageModal from "./MessageModal";

const Socials = () => {
  const [open, setOpen] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (open) {
      controls.stop();
      controls.start({
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.25,
        },
      });
    } else {
      controls.start({
        scale: [0, 1.5],
        opacity: [1, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        },
      });
    }
  }, [open]);

  return (
    <div className="fixed bottom-28 right-4">
      <button
        onClick={() => setOpen(!open)}
        className="size-12 bg-main-red flex-center rounded-full text-white border border-white relative"
      >
        <motion.div
          animate={controls}
          className={cn("absolute z-[-1] -inset-2 bg-main-red/50 rounded-full")}
        />
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
                className={cn(`social relative size-12 rounded-full`, {
                  "bg-main-green": item.color === "green",
                  "bg-main-blue": item.color === "blue",
                  "bg-main-pink": item.color === "pink",
                  "bg-main-dark-blue": item.color === "dark-blue",
                })}
              >
                <div
                  className={cn(
                    `absolute z-[-1] -inset-1 rounded-full !opacity-50`,
                    {
                      "bg-main-green": item.color === "green",
                      "bg-main-blue": item.color === "blue",
                      "bg-main-pink": item.color === "pink",
                      "bg-main-dark-blue": item.color === "dark-blue",
                    }
                  )}
                ></div>
                <div className="size-full rounded-full flex-center text-white border border-white">
                  {item.name}
                </div>
              </button>
            </MessageModal>
          ) : (
            <div
              className={cn(`social relative size-12 rounded-full`, {
                "bg-main-green": item.color === "green",
                "bg-main-blue": item.color === "blue",
                "bg-main-pink": item.color === "pink",
                "bg-main-dark-blue": item.color === "dark-blue",
              })}
              key={index}
            >
              <div
                className={cn(
                  `absolute z-[-1] -inset-1 rounded-full !opacity-50`,
                  {
                    "bg-main-green": item.color === "green",
                    "bg-main-blue": item.color === "blue",
                    "bg-main-pink": item.color === "pink",
                    "bg-main-dark-blue": item.color === "dark-blue",
                  }
                )}
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
