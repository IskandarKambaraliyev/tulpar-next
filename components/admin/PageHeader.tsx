"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreview } from "@/context/PreviewContext";
import Button from "../Button";

type Props = {
  title: string;
  count: number;
};
const PageHeader = ({ title, count }: Props) => {
  const { preview, setPreview } = usePreview();

  return (
    <div className="w-full p-4 bg-white border-b border-gray-100 flex flex-wrap items-center gap-4 justify-between">
      <h1 className="text-2xl lg:text-3xl font-semibold">{`${title} (${count})`}</h1>

      {preview !== "" && (
        <div className="max-lg:hidden">
          <Select
            defaultValue={preview}
            onValueChange={(value) => setPreview(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select preview" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-preview">No preview</SelectItem>
              <SelectItem value="both">Both</SelectItem>
              <SelectItem value="only-preview">Only Preview</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button className="lg:hidden">Show preview</Button>
    </div>
  );
};

export default PageHeader;
