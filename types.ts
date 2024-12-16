export type HeaderProps = {
  services: {
    id: string;
    title: string;
    slug: string;
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

export type MainService = {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
};

export type MainSpecialist = {
  id: string;
  name: string;
  specialty: string;
  image: string;
  slug: string;
};

export type PriceListType = {
  id: string;
  order: number;
  createdAt: Date;
  name: string;
  price: string;
};

export type ReportType = {
  id: string;
  title: string;
  order: number;
  createdAt: Date;
  src: string;
  is_video: boolean;
};

export type MianNewsType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  is_tip: boolean;
};

export type FaqType = {
  id: string;
  order: number;
  createdAt: Date;
  question: string;
  answer: string;
};
