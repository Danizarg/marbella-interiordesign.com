export type PortfolioItem = {
  id: string;
  image: string;
  label: string;
  meta: string;
  layout: "wide" | "right-small" | "full-bleed" | "portrait" | "split-left" | "split-right" | "cinematic";
};

export const portfolio: PortfolioItem[] = [
  {
    id: "residence-i",
    image: "/renders/render-01.jpg",
    label: "Residence I",
    meta: "Interior visualization",
    layout: "wide",
  },
  {
    id: "residence-ii",
    image: "/renders/render-09.jpg",
    label: "Residence II",
    meta: "Living room study",
    layout: "right-small",
  },
  {
    id: "residence-iii",
    image: "/renders/render-11.jpg",
    label: "Residence III",
    meta: "Full architectural render",
    layout: "full-bleed",
  },
  {
    id: "residence-iv",
    image: "/renders/render-13.jpg",
    label: "Residence IV",
    meta: "Detail composition",
    layout: "split-left",
  },
  {
    id: "residence-v",
    image: "/renders/render-14.jpg",
    label: "Residence V",
    meta: "Material study",
    layout: "split-right",
  },
  {
    id: "residence-vi",
    image: "/renders/render-16.jpg",
    label: "Residence VI",
    meta: "Volume and light",
    layout: "cinematic",
  },
  {
    id: "residence-vii",
    image: "/renders/render-18.jpg",
    label: "Residence VII",
    meta: "Bedroom composition",
    layout: "portrait",
  },
  {
    id: "residence-viii",
    image: "/renders/render-19.jpg",
    label: "Residence VIII",
    meta: "Bathroom study",
    layout: "portrait",
  },
  {
    id: "residence-ix",
    image: "/renders/render-20.jpg",
    label: "Residence IX",
    meta: "Kitchen visualization",
    layout: "full-bleed",
  },
];
