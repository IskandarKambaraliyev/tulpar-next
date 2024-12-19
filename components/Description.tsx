import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const Description = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return <p className={cn("font-medium max-w-2xl", className)}>{children}</p>;
};

export default Description;
