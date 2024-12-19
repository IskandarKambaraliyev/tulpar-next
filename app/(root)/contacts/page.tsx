import { Hero } from "@/components/contactsPage";

import { Metadata } from "next";

const ogImageTitle = `${
  process.env.ORIGIN_URL || "https://tulpar.stiv.uz"
}/api/og/${encodeURIComponent("How to find us?")}`;

export const metadata: Metadata = {
  title: "How to find us",
  description:
    "We are located in the heart of the city, near the main train station and bus stops. Our office is open from 9:00 to 18:00 on weekdays.",
  openGraph: {
    images: [
      {
        url: ogImageTitle,
        width: 1200,
        height: 630,
        alt: "How to find us?",
      },
    ],
  },
};

export default async function ContactsPage() {
  return (
    <>
      <Hero />
    </>
  );
}
