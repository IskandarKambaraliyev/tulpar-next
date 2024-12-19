"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";
import { MenuIcon, XIcon } from "lucide-react";

import useClickOutside from "@/hooks/useClickOutside";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";

import { HeaderLinksType } from "@/types";

type HeaderMenuType = {
  links: HeaderLinksType[];
};

export default function HeaderMenu({ links }: HeaderMenuType) {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useClickOutside(wrapperRef, () => setOpen(false));

  if (!isMounted) return null;

  return (
    <>
      <button
        className="md:hidden size-14 -mr-4 flex-center bg-main-dark-blue text-white"
        onClick={() => setOpen(!open)}
      >
        {!open ? <MenuIcon /> : <XIcon />}
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "tween",
                duration: 0.25,
              }}
              className="md:hidden fixed z-header-1 top-0 right-0 h-full max-w-[17rem] w-full bg-main-dark-blue text-white py-28 px-8 text-right"
              ref={wrapperRef}
            >
              <div className="flex flex-col gap-4">
                {links.map((item) =>
                  !item.children ? (
                    <Link
                      href={item.href}
                      key={item.title}
                      className="text-base font-medium py-1"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div key={item.title}>
                      <Accordion type="multiple">
                        <AccordionItem value={item.title}>
                          <AccordionTrigger className="text-base font-medium py-1">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-1 bg-white/10 divide-y divide-white/10">
                            {item.children.map((child) => (
                              <Link
                                href={child.href}
                                key={child.title}
                                className="py-1"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

type AdminHeaderMenu = {
  links: {
    title: string;
    href: string;
  }[];
};

export const AdminHeaderMenu = ({ links }: AdminHeaderMenu) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useClickOutside(wrapperRef, () => setOpen(false));

  if (!isMounted) return null;

  return (
    <>
      <button
        className="md:hidden size-10 flex-center rounded-xl bg-gray-100 hover:bg-gray-200"
        onClick={() => setOpen(!open)}
      >
        {!open ? <MenuIcon /> : <XIcon />}
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <div className="md:hidden fixed z-header-1 inset-0 size-full">
              <div className="absolute w-full h-16 top-0 left-0 bg-white z-[1]"></div>
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
                transition={{
                  type: "tween",
                  duration: 0.15,
                }}
                className="absolute inset-0 bg-black/20"
              ></motion.div>
              <motion.div
                initial={{
                  x: "100%",
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: "100%",
                }}
                transition={{
                  type: "tween",
                  duration: 0.15,
                }}
                className="absolute bottom-0 right-0 flex flex-col gap-2 bg-main-dark-blue text-white pt-36 pb-24 px-4 overflow-y-auto h-full max-w-[15rem] w-full"
                ref={wrapperRef}
              >
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.title}
                    className="py-2 text-lg font-medium"
                  >
                    {link.title}
                  </Link>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
