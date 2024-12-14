import prisma from "@/lib/db";
import { EmailParams, Recipient, MailerSend } from "mailersend";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for validation
const MessageSchema = z.object({
  email: z.string().trim().email("Invalid email format."),
  name: z.string().trim().min(3).max(30),
  message: z.string().trim(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message } = MessageSchema.parse(body);

    const origin = process.env.ORIGIN_URL || "http://localhost:3000";

    const createdMessage = await prisma.messages.create({
      data: {
        email,
        name,
        message,
      },
    });

    const mailersendClient = new MailerSend({
      apiKey: process.env.MAILER_SEND_API_KEY || "",
    });

    const recipients = [
      new Recipient("human.aow.official@gmail.com", "Iskandar"),
    ];

    const data = [
      {
        email: "human.aow.official@gmail.com",
        data: {
          name: name,
          message: message,
          email: email,
          message_link: origin + "/admin/messages/" + createdMessage.id,
        },
      },
    ];

    const sender = new Recipient("MS_bnMxdy@stiv.uz", "Takhirjanovich");

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject(`${name} sizga xabar yubordi`)
      .setPersonalization(data)
      .setTemplateId("neqvygmm2rdg0p7w");

    const res = await mailersendClient.email.send(emailParams);

    if (res.statusCode === 200 || res.statusCode === 202) {
      return NextResponse.json({ message: "Success" });
    }

    return NextResponse.json({ message: "Failed to send email." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
