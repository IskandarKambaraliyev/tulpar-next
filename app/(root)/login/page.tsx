"use client";

import loginUser from "@/app/actions/login";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type FieldErrors = {
  email?: string[];
  password?: string[];
};

type FormErrors = {
  form: any[];
};

type Errors = FieldErrors | FormErrors;

const initialState = {
  errors: {} as Errors,
};

export default function LoginPage() {
  const [state, formAction] = useActionState(loginUser, initialState);

  return (
    <div className="w-screen min-h-screen flex-center">
      <form
        action={formAction}
        className="flex flex-col gap-4 p-4 rounded-2xl bg-main-dark-blue text-center max-w-lg w-[calc(100%-2rem)]"
      >
        <h1 className="text-white font-semibold text-2xl">Login</h1>

        <div className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-white rounded p-4"
            autoComplete="username"
          />
          {"email" in state.errors &&
            state.errors.email &&
            state.errors.email.length > 0 && (
              <span className="text-red-500" aria-live="polite">
                {state.errors.email[0]}
              </span>
            )}
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="bg-white rounded p-4"
            autoComplete="current-password"
          />
          {"password" in state.errors &&
            state.errors.password &&
            state.errors.password.length > 0 && (
              <span className="text-red-500" aria-live="polite">
                {state.errors.password[0]}
              </span>
            )}
        </div>

        {"form" in state.errors && state.errors.form.length > 0 && (
          <span className="text-red-500" aria-live="polite">
            {state.errors.form[0]}
          </span>
        )}

        <SubmitBtn />
      </form>
    </div>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-white p-4 rounded font-semibold hover:opacity-90 active:scale-95 transition-transform"
      disabled={pending}
    >
      {pending ? "Loading..." : "Login"}
    </button>
  );
}
