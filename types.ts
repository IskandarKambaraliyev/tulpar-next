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

export type MainNewsType = {
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

export type ServicesServiceType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type MediaType = "all" | "photo" | "video";

export type NewsType = "all" | "news" | "tips";

export type NewsDetailType = {
  id: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  content: string;
  is_tip: boolean;
  order: number;
  createdAt: Date;
};

export type SpecialistsType = {
  id: string;
  slug: string;
  name: string;
  image: string;
  job_title: string;
  specialty: string;
  career: string;
  experience: string;
  order: number;
  createdAt: Date;
};

export type AllowedTypes =
  | "service"
  | "specialists"
  | "newsAndTips"
  | "messages"
  | "priceList"
  | "questionAnswers"
  | "reports";
