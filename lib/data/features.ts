export type Feature = {
  id: string;
  label: string;
  title: string;
  body: string;
  image: string;
  focus?: string;
};

export const features: Feature[] = [
  {
    id: "lighting",
    label: "Lighting",
    title: "Know how the room feels at every hour.",
    body: "Natural, artificial and mixed light — studied and resolved before a single fixture is specified.",
    image: "/renders/render-04.jpg",
    focus: "center",
  },
  {
    id: "materials",
    label: "Materials",
    title: "Compare finishes before committing to them.",
    body: "Stone, timber, plaster and textile. Grain, sheen and warmth previewed at true scale.",
    image: "/renders/render-15.jpg",
    focus: "right",
  },
  {
    id: "space",
    label: "Space",
    title: "Understand proportion before construction begins.",
    body: "Circulation, sightlines and volume — resolved as architecture, not decoration.",
    image: "/renders/render-21.jpg",
    focus: "left",
  },
  {
    id: "detail",
    label: "Detail",
    title: "Nothing is left to imagination.",
    body: "Cabinetry, joinery, transitions. Every meeting of materials seen before it is built.",
    image: "/renders/render-24.jpg",
    focus: "center",
  },
];
