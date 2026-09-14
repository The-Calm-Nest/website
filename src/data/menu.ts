import type { MenuItem } from "../types/menu";

export const menuItems: MenuItem[] = [
  {
    id: "klassisk-surdeig",
    category: "SURDEIGSBRØD",
    name: "Klassisk surdeig",
    description:
      "En blanding av fint hvetemel og nymalt sammalt spelt eller hvete etter tilgjengelighet. Naturlig hevet, langtidshevet.",
    price: 110,
    order: 10,
  },
  {
    id: "valnott-tranebaer",
    category: "SURDEIGSBRØD",
    name: "Surdeig med valnøtt og tranebær",
    description: "Ukens inklusjonsbrød.",
    price: 140,
    order: 20,
  },
  {
    id: "sandwichbrod",
    category: "SURDEIGSBRØD",
    name: "Surdeig sandwichbrød",
    description:
      "Mykt, lyst og luftig brød. Beriket med lønnesirup og honning.",
    price: 120,
    order: 30,
  },
  {
    id: "pizzabunner",
    category: "SURDEIGSBRØD",
    name: "Pizzabunner",
    description:
      "To medium surdeigsbunner, toppes etter eget ønske. Kan fint fryses.",
    price: 120,
    order: 40,
  },
  {
    id: "silla-brod",
    category: "MØRKT RUGBRØD",
    name: "Silla Brød",
    description:
      "Mørkt rugbrød med kaffe, linfrø og melasse. Rikt, kompakt, holder seg i dager.",
    price: 130,
    priceWithSeeds: 145,
    extraText: "+ 15 kr for frøblanding (lin, gresskar, solsikke, chia)",
    order: 50,
  },
  {
    id: "borodinsky",
    category: "MØRKT RUGBRØD",
    name: "Russisk Borodinsky",
    description:
      "Mørkt rugbrød med karvefrø. En tradisjonell favoritt.",
    price: 130,
    priceWithSeeds: 145,
    extraText: "+ 15 kr for frøblanding",
    order: 60,
  },
  {
    id: "karamell-kokos",
    category: "BAKVERK",
    name: "Karamell- og kokosnøttkjeks",
    quantity: "6 stk.",
    price: 200,
    order: 70,
  },
  {
    id: "sitron-blabaer",
    category: "BAKVERK",
    name: "Sitron- og blåbærscones",
    quantity: "4 stk.",
    price: 180,
    order: 80,
  },
  {
    id: "granola",
    category: "UKENS GRANOLA — 300 G",
    name: "Jordbær & hvit sjokolade",
    badge: "Denne uken.",
    price: 230,
    order: 90,
  },
];