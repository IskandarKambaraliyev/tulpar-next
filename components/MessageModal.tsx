"use client";

import { useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Button from "./Button";
import sendMessage from "@/app/actions/sendMessage";
import { ReactNode, useActionState } from "react";
import { useFormStatus } from "react-dom";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

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

const MessageModal = ({ children }: { children: ReactNode }) => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [state, formAction] = useActionState(sendMessage, initialState);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Leave us your message
          </DialogTitle>
          {state?.success && (
            <DialogDescription className="text-center text-main-green text-base">
              Your message is sent successfully
            </DialogDescription>
          )}
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-12 modal-form">
          <input type="hidden" name="recaptcha" value={recaptchaToken || ""} />

          {state &&
            state.errors &&
            "form" in state.errors &&
            state.errors.form.length > 0 && (
              <span className="text-red-500" aria-live="polite">
                {state.errors.form[0]}
              </span>
            )}

          <div className="flex flex-col gap-4">
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
              <textarea
                name="message"
                placeholder="Message"
                required
              ></textarea>

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
          </div>

          {/* Google reCAPTCHA */}
          {!recaptchaToken && (
            <GoogleReCaptcha onVerify={handleRecaptchaChange} />
          )}

          <div className="flex items-center justify-center gap-4">
            <DialogClose asChild>
              <Button rounded outlined color="white">
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
    <Button type="submit" loading={pending} rounded color="white">
      Submit
    </Button>
  );
}
