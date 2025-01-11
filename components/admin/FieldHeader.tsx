"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePreview } from "@/context/PreviewContext";

type Props = {
  field: string;
};
const FieldHeader = ({ field }: Props) => {
  const { preview, setPreview } = usePreview();
  return (
    <section className="px-4 h-16 flex items-center justify-between bg-white border-b border-gray-100">
      <h1 className="text-xl lg:text-2xl font-semibold">{useTitle(field)}</h1>

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
    </section>
  );
};

export default FieldHeader;

function useTitle(field: string) {
  switch (field) {
    case "services":
      return "Services";
    case "specialists":
      return "Specialists";
    case "price-list":
      return "Price List";
    case "reports":
      return "Reports";
    case "news":
      return "News";
    case "faq":
      return "FAQ";
    case "messages":
      return "Messages";
    default:
      return "";
  }
}
