"use server";

import { z } from "zod";
import { EmailParams, Recipient, MailerSend } from "mailersend";

const schema = z.object({
  name: z.string().trim().min(3).max(30),
  email: z.string().email().trim(),
  message: z.string().trim(),
});

export default async function sendMessage(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    try {
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
        return {
          success: true,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        errors: {
          form: [
            "An error occurred while sending your message. Please try again later.",
          ],
        },
      };
    }
  }
}
