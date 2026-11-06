export type PriceOption = { quantity: string; price: number };

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  priceWithSeeds?: number;
  priceOptions?: PriceOption[];
  extraText?: string;
  quantity?: string;
  badge?: string;
  ingredients?: string;
  allergens?: string;
  visible?: boolean;
  order: number;
};