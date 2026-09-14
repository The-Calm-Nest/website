export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  priceWithSeeds?: number;
  extraText?: string;
  quantity?: string;
  badge?: string;
  order: number;
};