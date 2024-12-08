import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { HeaderLinksType, HeaderProps } from "@/types";

const Header = ({ services }: HeaderProps) => {
  const HEADER_LINKS: HeaderLinksType[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Our Services",
      children: [
        {
          title: "Our Services",
          href: "/services",
        },
        ...services.map((service) => ({
          title: service.title,
          href: `/services/${service.id}`,
        })),
      ],
    },
  ];
  return (
    <header className="sticky top-0 left-0 w-full h-20 bg-white z-header border-b border-gray-100 flex-center">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/">
          <Logo />
        </Link>

        <ul className="flex items-center gap-4">
          {HEADER_LINKS.map((link) => (
            <li key={link.title}>
              {!link.children ? (
                <Link href={link.href}>{link.title}</Link>
              ) : (
                <div>
                  {link.children.map((child) => (
                    <Link key={child.title} href={child.title}>
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
