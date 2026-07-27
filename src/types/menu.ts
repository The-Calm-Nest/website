export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  price_with_seeds: number | null;
  extra_text: string | null;
  badge: string | null;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};