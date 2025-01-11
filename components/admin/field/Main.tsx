"use client";

import { useEffect, useState } from "react";
import FieldHeader from "../FieldHeader";
import { usePreview } from "@/context/PreviewContext";
import PreviewDesktop from "./PreviewDesktop";
import { Services } from "@/components/services";
import { cn } from "@/lib/utils";

type Props = {
  field: string;
  data: any;
};

const Main = ({ field, data }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { preview, previewWidth } = usePreview();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <FieldHeader field={field} />

      <section
        className={cn("max-lg:hidden w-full h-[calc(100vh-9rem)] grid")}
        style={{
          gridTemplateColumns: `auto ${
            preview === "both" ? previewWidth + "px" : ""
          }`,
        }}
      >
        {preview !== "only-preview" && (
          <div className="h-full overflow-y-auto">Content</div>
        )}
        {preview !== "no-preview" && (
          <PreviewDesktop>
            <Services
              data={data}
              width={preview === "both" ? previewWidth : undefined}
            />
          </PreviewDesktop>
        )}
      </section>
    </>
  );
};

export default Main;
