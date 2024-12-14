"use server";

import fetch from "node-fetch";
import { z } from "zod";
import { EmailParams, Recipient, MailerSend } from "mailersend";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const schema = z.object({
  name: z.string().trim().min(3).max(30),
  email: z.string().email().trim(),
  message: z.string().trim(),
  recaptcha: z.string(),
});

export default async function sendMessage(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    recaptcha: formData.get("recaptcha") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Verify reCAPTCHA
    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY!,
          response: validatedFields.data.recaptcha,
        }).toString(),
      }
    );

    const verifyResult = (await verifyResponse.json()) as any;
    if (!verifyResult.success) {
      return {
        errors: { form: ["reCAPTCHA verification failed."] },
      };
    }

    // Continue processing form submission (sending email, saving to DB, etc.)
    const mailersendClient = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY || "",
    });

    const recipients = [
      new Recipient(validatedFields.data.email, validatedFields.data.name),
    ];

    const data = [
      {
        email: validatedFields.data.email,
        data: {
          name: validatedFields.data.name,
          message: validatedFields.data.message,
        },
      },
    ];

    const sender = new Recipient("MS_bnMxdy@stiv.uz", "Takhirjanovich");

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject("Tulpar - Your message has been received")
      .setPersonalization(data)
      .setTemplateId("3yxj6ljopn04do2r");

    const res = await mailersendClient.email.send(emailParams);

    if (res.statusCode === 200 || res.statusCode === 202) {
      const origin = process.env.ORIGIN_URL || "http://localhost:3000";
      const resApi = await fetch(`${origin}/api/new-message`, {
        method: "POST",
        body: JSON.stringify({
          email: validatedFields.data.email,
          name: validatedFields.data.name,
          message: validatedFields.data.message,
        }),
      });
      const dataApi = await resApi.json();
      console.log(dataApi, resApi);
      return { success: true };
    }
  } catch (error) {
    console.error(error);
    return {
      errors: { form: ["An error occurred while sending your message."] },
    };
  }
}
