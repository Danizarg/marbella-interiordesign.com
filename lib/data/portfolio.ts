import { img, type ConceptImage } from "./imagery";

export type PortfolioItem = {
  id: string;
  image: ConceptImage;
  label: string;
  meta: string;
  /** Editorial slot — drives the varied rhythm of the sequence. */
  layout: "opening" | "offset" | "bleed" | "pair-a" | "pair-b" | "tall" | "closing";
};

export const portfolio: PortfolioItem[] = [
  {
    id: "i",
    image: img.stoneLiving,
    label: "Stone, timber, light",
    meta: "Living volume",
    layout: "opening",
  },
  {
    id: "ii",
    image: img.archNiche,
    label: "Plaster and shadow",
    meta: "Interior study",
    layout: "offset",
  },
  {
    id: "iii",
    image: img.poolTerrace,
    label: "Inside becomes outside",
    meta: "Terrace threshold",
    layout: "bleed",
  },
  {
    id: "iv",
    image: img.travertineStair,
    label: "Travertine and oak",
    meta: "Circulation detail",
    layout: "pair-a",
  },
  {
    id: "v",
    image: img.materialStudy,
    label: "Surface at true scale",
    meta: "Material study",
    layout: "pair-b",
  },
  {
    id: "vi",
    image: img.villaThreshold,
    label: "A door to the sea",
    meta: "Threshold",
    layout: "tall",
  },
  {
    id: "vii",
    image: img.villaEvening,
    label: "The room after dark",
    meta: "Evening light",
    layout: "closing",
  },
];
