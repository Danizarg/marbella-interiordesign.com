export type Stage = {
  n: string;
  key: string;
  title: string;
  body: string;
  image: string;
};

export const process: Stage[] = [
  {
    n: "01",
    key: "brief",
    title: "Brief",
    body: "Understand the property, architecture and ambition.",
    image: "/renders/render-05.jpg",
  },
  {
    n: "02",
    key: "design",
    title: "Design",
    body: "Layouts and spatial decisions begin taking shape.",
    image: "/renders/render-10.jpg",
  },
  {
    n: "03",
    key: "model",
    title: "Model",
    body: "The architecture becomes a precise three-dimensional environment.",
    image: "/renders/render-17.jpg",
  },
  {
    n: "04",
    key: "material",
    title: "Material",
    body: "Stone, timber, textile and finishes are refined.",
    image: "/renders/render-22.jpg",
  },
  {
    n: "05",
    key: "light",
    title: "Light",
    body: "Natural and artificial light define the atmosphere.",
    image: "/renders/render-08.jpg",
  },
  {
    n: "06",
    key: "render",
    title: "Render",
    body: "The concept becomes visually tangible.",
    image: "/renders/render-02.jpg",
  },
];
