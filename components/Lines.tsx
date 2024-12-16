import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  color?: "light" | "dark";
};
const Lines = ({ color = "light" }: Props) => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 right-[15%] h-full w-[20%] grid grid-cols-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn("", {
              "bg-transparent col-span-1": i == 1,
              "col-span-2": i !== 1,
              "bg-[#F3F5FA]": i !== 1 && color === "light",
              "bg-[#49647D]": i !== 1 && color === "dark",
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default Lines;
