export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  priceNote?: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "classic-sourdough",
    category: "Surdeigsbrød",
    name: "Klassisk surdeig",
    description:
      "Åpen smule, gyllenbrun skorpe, naturlig hevet. Vårt signaturbrød.",
    price: 120,
    badge: "Ukentlig",
  },
  {
    id: "garlic-sourdough",
    category: "Surdeigsbrød",
    name: "Surdeig med ristet hvitløk og italienske urter",
    description: "Ukentlig inklusjonsbrød – ny smak hver uke.",
    price: 140,
    badge: "Denne uken",
  },
  {
    id: "sandwich-bread",
    category: "Surdeigsbrød",
    name: "Surdeig sandwichbrød",
    description:
      "Myk hvit smule, beriket med avokadoolje og honning.",
    price: 120,
    badge: "Ukentlig",
  },
  {
    id: "cookies",
    category: "Bakverk",
    name: "Dobbel peanøttsmørcookies",
    description: "6 stk. Sprø kant, seig midte.",
    price: 200,
  },
];