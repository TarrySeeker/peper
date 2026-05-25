export type CategorySlug =
  | "krabiki"
  | "rascheski"
  | "kosmetichki"
  | "grebeshki"
  | "sumki";

export interface Category {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  details: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  customizable?: boolean;
  colors?: { name: string; hex: string }[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization?: {
    text?: string;
    font?: string;
    color?: string;
  };
  cartKey: string;
}
