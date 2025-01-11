"use client";

import Button from "../Button";
import Input from "./Input";
import { useActionState, useEffect, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";
import Switch from "./Switch";
import addData from "@/app/actions/addData";
import { useFormStatus } from "react-dom";
import { redirect, useSearchParams } from "next/navigation";
import SelectId from "./SelectId";

type Props = {
  type: string;
  data: any;
  services: [] | { id: string; title: string }[];
  priceList: [] | { id: string; name: string }[];
};

const initialState = {} as {
  error: string | null;
  success?: boolean;
  message?: string;
};
const AddForm = ({ type, data, services, priceList }: Props) => {
  const [state, formAction] = useActionState(addData, initialState);
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        redirect(redirectUrl);
      }, 2000);
    }
  }, [state]);
  if (!data || !mounted || typeof document === "undefined") return null;
  return (
    <form
      action={formAction}
      className="flex flex-col space-y-8 max-w-xl w-[calc(100%-2rem)] mx-auto p-4 rounded-3xl border border-gray-200 bg-white"
    >
      <div className="space-y-1">
        <h1 className="text-center text-2xl lg:text-2xl font-bold">{`Add a ${useTitle(
          type
        )}`}</h1>
        {state.error && (
          <p className="text-main-red text-center">{state.error}</p>
        )}
        {state.success && (
          <p className="text-main-green text-center">{state.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-4">
        {Object.entries(data).map(([key, value]) => {
          if (value === "html") {
            return (
              <div key={key} className="space-y-1">
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
                  onEditorChange={(content) => setContent(content)}
                />

                <input type="hidden" name={key} value={content} required />
              </div>
            );
          } else if (value === "boolean") {
            return <Switch name={key} label={key} key={key} />;
          }
          return <Input name={key} key={key} label={key} />;
        })}

        {(type === "service" || type === "priceList") && (
          <SelectId
            label={
              type === "service"
                ? "Connect price lists to this service"
                : "Connect services to this price list"
            }
            list={type === "service" ? priceList : services}
          />
        )}

        <input type="hidden" name="type" defaultValue={type} />
      </div>

      <SubmitBtn />
    </form>
  );
};

export default AddForm;

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="!py-5" loading={pending}>
      Submit
    </Button>
  );
};

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
