import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};
const Title = ({ children, className }: Props) => {
  return (
    <h3
      className={cn(
        "text-xl md:text-4xl lg:text-5xl font-bold uppercase max-w-3xl",
        className
      )}
    >
      {children}
    </h3>
  );
};

export default Title;
