export type HeaderProps = {
  services: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
};

export type HeaderLinksType = {
  title: string;
} & (
  | {
      href: string;
      children?: undefined;
    }
  | {
      href?: undefined;
      children: {
        title: string;
        href: string;
      }[];
    }
);
