import prisma from "@/lib/db";
import { EmailParams, Recipient, MailerSend } from "mailersend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, message } = await req.json();

  const origin = process.env.ORIGIN_URL || "http://localhost:3000";

  try {
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
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Error" });
  }
}
