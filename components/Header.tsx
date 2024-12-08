import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { HeaderLinksType, HeaderProps } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TriggerIcon } from "./icons";

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
          href: `/services/${service.slug}`,
        })),
      ],
    },
    {
      title: "Reports",
      href: "/reports",
    },
    {
      title: "About Us",
      children: [
        {
          title: "Our Specialists",
          href: "/specialists",
        },
        {
          title: "How to Find Us",
          href: "/contacts",
        },
      ],
    },
    {
      title: "News",
      href: "/news",
    },
  ];
  return (
    <header className="header sticky top-0 left-0 w-full h-20 bg-white z-header border-b border-gray-100 flex-center">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/">
          <Logo />
        </Link>

        <ul className="flex items-center gap-2 lg:gap-4">
          {HEADER_LINKS.map((link) => (
            <li key={link.title}>
              {!link.children ? (
                <Link href={link.href} className="header-link">
                  {link.title}
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className="header-link flex items-center gap-1.5">
                    {link.title}
                    <TriggerIcon className="text-main-red" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.title} asChild>
                        <Link href={child.href} className="cursor-pointer">
                          {child.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
