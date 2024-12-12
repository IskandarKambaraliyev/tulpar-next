"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Button from "./Button";
import sendMessage from "@/app/actions/sendMessage";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type FieldErrors = {
  name?: string[];
  email?: string[];
  message?: string[];
};

type FormErrors = {
  form: any[];
};

type Errors = FieldErrors | FormErrors;

const initialState = {
  errors: {} as Errors,
};

const MessageModal = () => {
  const [state, formAction] = useActionState(sendMessage, initialState);
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {!state?.success
              ? `What's on your mind?`
              : `Your Message Sent Successfully!`}
          </DialogTitle>
          {!state?.success && (
            <DialogDescription>
              Write your message and send us!
            </DialogDescription>
          )}
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
          {state &&
            state.errors &&
            "form" in state.errors &&
            state.errors.form.length > 0 && (
              <span className="text-red-500" aria-live="polite">
                {state.errors.form[0]}
              </span>
            )}

          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Name"
              minLength={3}
              maxLength={30}
              required
            />
            {state &&
              state.errors &&
              "name" in state.errors &&
              state.errors.name &&
              state.errors.name.length > 0 && (
                <span className="text-red-500" aria-live="polite">
                  {state.errors.name[0]}
                </span>
              )}
          </div>

          <div className="flex flex-col">
            <input type="email" name="email" placeholder="Email" required />
            {state &&
              state.errors &&
              "email" in state.errors &&
              state.errors.email &&
              state.errors.email.length > 0 && (
                <span className="text-red-500" aria-live="polite">
                  {state.errors.email[0]}
                </span>
              )}
          </div>

          <div className="flex flex-col">
            <textarea name="message" placeholder="Message" required></textarea>

            {state &&
              state.errors &&
              "message" in state.errors &&
              state.errors.message &&
              state.errors.message.length > 0 && (
                <span className="text-red-500" aria-live="polite">
                  {state.errors.message[0]}
                </span>
              )}
          </div>

          <div className="flex items-center gap-4">
            <DialogClose asChild>
              <Button rounded outlined>
                Cancel
              </Button>
            </DialogClose>

            <SubmitBtn />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} rounded outlined>
      Submit
    </Button>
  );
}
