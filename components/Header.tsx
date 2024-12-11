import React from "react";
import Link from "next/link";

import Logo from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoIcon, TriggerIcon } from "./icons";
import { AdminHeaderMenu } from "./HeaderMenu";

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

export const AdminHeader = () => {
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/admin/services",
    },
    {
      title: "Specialists",
      href: "/admin/specialists",
    },
    {
      title: "Reports",
      href: "/admin/reports",
    },
    {
      title: "News",
      href: "/admin/news",
    },
    {
      title: "Price List",
      href: "/admin/price-list",
    },
    {
      title: "FAQ",
      href: "/admin/faq",
    },
  ];
  return (
    <header className="header sticky z-header top-0 left-0 w-full h-20 bg-white border-b border-gray-100 flex-center">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/admin" className="flex items-center gap-2">
          <LogoIcon className="h-auto w-[3rem] md:w-[3.5rem] lg:w-[4rem]" />
          <span className="font-bold text-lg md:text-xl lg:text-2xl uppercase">
            Admin
          </span>
        </Link>

        <div className="max-md:hidden flex items-center gap-2 lg:gap-4">
          {links.map((link) => (
            <Link key={link.title} href={link.href} className="header-link">
              {link.title}
            </Link>
          ))}
        </div>

        <AdminHeaderMenu links={links} />
      </div>
    </header>
  );
};
