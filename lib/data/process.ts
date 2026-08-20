import { img, type ConceptImage } from "./imagery";

export type Stage = {
  n: string;
  key: string;
  title: string;
  body: string;
  image: ConceptImage;
};

export const process: Stage[] = [
  {
    n: "01",
    key: "brief",
    title: "Brief",
    body: "Understand the property, architecture and ambition.",
    image: img.villaTerrace,
  },
  {
    n: "02",
    key: "design",
    title: "Design",
    body: "Layouts and spatial decisions begin taking shape.",
    image: img.warmLounge,
  },
  {
    n: "03",
    key: "model",
    title: "Model",
    body: "The architecture becomes a precise three-dimensional environment.",
    image: img.stoneLiving,
  },
  {
    n: "04",
    key: "material",
    title: "Material",
    body: "Stone, timber, textile and finishes are refined.",
    image: img.materialStudy,
  },
  {
    n: "05",
    key: "light",
    title: "Light",
    body: "Natural and artificial light define the atmosphere.",
    image: img.lightStudy,
  },
  {
    n: "06",
    key: "render",
    title: "Render",
    body: "The concept becomes visually tangible.",
    image: img.travertineCorridor,
  },
];
