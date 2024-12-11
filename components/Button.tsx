"use client";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  color?: "red" | "blue" | "green" | "dark" | "white";
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
} & (
  | {
      rounded?: false;
      outlined?: never;
    }
  | {
      rounded?: true;
      outlined?: boolean;
    }
);

const Button = ({
  children,
  className,
  href,
  color = "dark",
  type = "button",
  disabled = false,
  loading = false,
  rounded = false,
  outlined = false,
  onClick,
}: Props) => {
  const classes = cn(
    "",
    {
      "rounded-xl lg:rounded-2xl px-4 py-2 lg:px-6 lg:py-3 text-white hover:opacity-90 active:scale-95 transition-transform flex-center gap-4":
        !rounded,
      "bg-white text-main-dark-blue":
        (!rounded && color === "white") ||
        (rounded && !outlined && color === "white"),
      "bg-main-dark-blue":
        (!rounded && color === "dark") ||
        (rounded && !outlined && color === "dark"),
      "bg-main-red":
        (!rounded && color === "red") ||
        (rounded && !outlined && color === "red"),
      "bg-main-blue":
        (!rounded && color === "blue") ||
        (rounded && !outlined && color === "blue"),
      "bg-main-green":
        (!rounded && color === "green") ||
        (rounded && !outlined && color === "green"),
      "rounded-full px-8 py-3 lg:px-10 lg:py-4": rounded,
      "border bg-transparent hover:text-white transition": rounded && outlined,
      "border-white text-white hover:bg-white hover:text-main-dark-blue":
        rounded && outlined && color === "white",
      "border-main-dark-blue text-main-dark-blue hover:bg-main-dark-blue":
        rounded && outlined && color === "dark",
      "border-main-red text-main-red hover:bg-main-red":
        rounded && outlined && color === "red",
      "border-main-blue text-main-blue hover:bg-main-blue":
        rounded && outlined && color === "blue",
      "border-main-green text-main-green hover:bg-main-green":
        rounded && outlined && color === "green",
      "hover:opacity-90 text-white": rounded && !outlined,
      "bg-gray-300 text-gray-400 active:scale-100 hover:opacity-100 transition-none border-none":
        disabled || loading,
    },
    className
  );
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {loading && <LoaderCircle className="size-5 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
