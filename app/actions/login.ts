"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim(),
});

export default async function loginUser(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    const origin = process.env.ORIGIN_URL || "http://localhost:3000";
    const res = await fetch(`${origin}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      redirect("/admin");
    } else {
      return {
        errors: {
          form: [data.message],
        },
      };
    }
  }
}
