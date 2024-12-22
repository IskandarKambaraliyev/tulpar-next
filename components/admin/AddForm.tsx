"use client";

import Button from "../Button";
import Input from "./Input";
import { useEffect, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectGroup } from "@radix-ui/react-select";

type Props = {
  type: string;
  data: any;
  services: [] | { id: string; title: string }[];
  priceList: [] | { id: string; name: string }[];
};
const AddForm = ({ type, data, services, priceList }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!data || !mounted || typeof document === "undefined") return null;
  return (
    <form
      action=""
      className="flex flex-col space-y-8 max-w-xl w-[calc(100%-2rem)] mx-auto p-4 rounded-3xl border border-gray-200 bg-white"
    >
      <h1 className="text-center text-2xl lg:text-2xl font-bold">{`Add a ${useTitle(
        type
      )}`}</h1>
      <div className="flex flex-col space-y-4">
        {Object.entries(data).map(([key, value]) => {
          if (value === "html") {
            return (
              <div
                key={key}
                className="px-4 py-2 space-y-4 rounded-2xl border border-gray-200 bg-white"
              >
                <p>{`${key} field*`}</p>
                <Editor
                  apiKey="013k8cur6yywlejp4fiyufmhwx2fvnlkb8lbcp8ql75v6gho"
                  init={{
                    height: 400,
                    menubar: "happy",
                    plugins: ["link", "lists", "image", "code"],
                    toolbar:
                      "undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist | code | link image | heading",
                  }}
                  initialValue={`<h1>${key}</h1>`}
                  onEditorChange={(content) => setContent(content)}
                />

                <input type="hidden" name={key} value={content} required />
              </div>
            );
          } else if (value === "boolean") {
            return (
              <Select key={key} name={key}>
                <SelectTrigger>
                  <SelectValue placeholder={key} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{key}</SelectLabel>
                    <SelectItem value="true">true</SelectItem>
                    <SelectItem value="false">false</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }
          return (
            // <tr key={key}>
            //   <td>{key}</td>
            //   <td>{typeof value}</td>
            // </tr>
            <Input name={key} key={key} placeholder={key} />
          );
        })}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddForm;

const useTitle = (type: string) => {
  switch (type) {
    case "service":
      return "Service";
    case "specialists":
      return "Specialist";
    case "newsAndTips":
      return "News or Tips";
    case "priceList":
      return "Price List";
    case "questionAnswers":
      return "Question and Answer";
    case "reports":
      return "Report";
    default:
      return "Data";
  }
};
