"use client";

import { usePreview } from "@/context/PreviewContext";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
};
const PreviewDesktop = ({ children }: Props) => {
  const { preview, previewWidth, setPreviewWidth } = usePreview();
  const resizerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || preview !== "both") return;

      console.log("handleMouseMove");
      const newWidth = window.innerWidth - e.clientX;
      setPreviewWidth(
        Math.min(Math.max(384, newWidth), window.innerWidth - 400)
      );
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, setPreviewWidth]);
  return (
    <div className="relative h-full overflow-hidden transition-all will-change-auto">
      <div
        className={cn(
          "absolute w-1 h-full bg-main-red top-0 left-0 transition-all cursor-col-resize",
          {
            "w-2": isResizing,
            "hover:w-2": !isResizing,
          }
        )}
        ref={resizerRef}
        onMouseDown={() => setIsResizing(true)}
      />
      <div
        className={cn("h-full overflow-y-auto", {
          "pointer-events-none": isResizing,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default PreviewDesktop;
