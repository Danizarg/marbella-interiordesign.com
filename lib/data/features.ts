import { img, type ConceptImage } from "./imagery";

export type Feature = {
  id: string;
  label: string;
  title: string;
  body: string;
  image: ConceptImage;
  /** Extra crop applied while this tab is active — gives the switch consequence. */
  zoom: number;
};

export const features: Feature[] = [
  {
    id: "lighting",
    label: "Lighting",
    title: "Know how a room feels at every hour.",
    body: "Natural, artificial and mixed light — studied and resolved before a single fixture is specified.",
    image: img.lightStudy,
    zoom: 1.04,
  },
  {
    id: "materials",
    label: "Materials",
    title: "Compare finishes before committing to them.",
    body: "Stone, timber, plaster and textile. Grain, sheen and warmth previewed at true scale.",
    image: img.marbleDetail,
    zoom: 1.12,
  },
  {
    id: "space",
    label: "Space",
    title: "Understand proportion before construction begins.",
    body: "Circulation, sightlines and volume — resolved as architecture, not decoration.",
    image: img.stoneLiving,
    zoom: 1,
  },
  {
    id: "detail",
    label: "Detail",
    title: "Nothing is left to imagination.",
    body: "Cabinetry, joinery, transitions. Every meeting of materials seen before it is built.",
    image: img.travertineStair,
    zoom: 1.18,
  },
];
