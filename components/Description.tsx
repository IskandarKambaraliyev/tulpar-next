import { cn } from "@/lib/utils";
import React from "react";

const Description = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <p className={cn("font-medium max-w-2xl", className)}>{children}</p>;
};

export default Description;
