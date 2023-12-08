export type ProductType = {
  _id: string;
  brand: string;
  createdAt: string;
  date: string;
  description: string;
  images: string;
  info: string;
  like: Array<String>;
  name: string;
  price: number;
  sale: number;
  slug: string;
  sold: number;
  star: number;
  status: string;
  type: string;
};

export type CartType = {
  _id: string;
  brand: string;
  createdAt: string;
  date: string;
  images: string;
  quantity: number;
  like: Array<String>;
  name: string;
  price: number;
  sale: number;
  slug: string;
  sold: number;
  star: number;
  status: string;
  type: string;
};
