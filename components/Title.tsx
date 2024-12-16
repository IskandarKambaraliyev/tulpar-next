import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
const Title = ({ children, className }: Props) => {
  return (
    <h3 className={cn("text-xl md:text-4xl lg:text-5xl font-bold", className)}>
      {children}
    </h3>
  );
};

export default Title;
