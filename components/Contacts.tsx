import { GoogleMapsEmbed } from "@next/third-parties/google";

import Title from "./Title";

const Contacts = () => {
  const list = [
    {
      title: "Address",
      links: [
        {
          title: "Uzbekistan, Tashkent, Nest One",
          link: "https://maps.app.goo.gl/4ZPzvyt2fJfNoqQZ7",
        },
      ],
    },
    {
      title: "Phone numbers",
      links: [
        {
          title: "+998 90 123 45 67",
          link: "tel:+998971234567",
        },
        {
          title: "+998 97 123 45 67",
          link: "tel:+998971234567",
        },
      ],
    },
    {
      title: "Additional contacts",
      links: [
        {
          title: "tulpar@example.com",
          link: "mailto:tulpar@example.com",
        },
      ],
    },
  ];
  return (
    <section className="section bg-gray-50">
      <div className="container space-y-12">
        <Title>Contacts</Title>

        <div className="w-full">
          <GoogleMapsEmbed
            apiKey={process.env.GOOGLE_MAP_API_KEY || ""}
            height={300}
            width="100%"
            mode="place"
            q="Nest One,Tashkent,Uzbekistan"
          />
        </div>

        <div className="flex max-sm:flex-col flex-wrap items-start gap-8 md:gap-x-12">
          {list.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-base md:text-lg font-semibold">
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.link}
                      className="text-sm md:text-base hover:underline"
                      target="_blank"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contacts;
