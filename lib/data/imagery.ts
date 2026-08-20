/**
 * CONCEPT IMAGERY — replace with client-owned assets before production.
 *
 * The studio's own render library (public/renders/) could not carry a premium
 * presentation: the strongest available files top out at ~1820px, several are
 * untextured clay work-in-progress renders, and three are 3ds Max wireframe
 * viewport screenshots. Those are working artefacts, not finished work.
 *
 * Every image below is royalty-free (Pexels licence) and stands in for the
 * studio's real renders purely so the redesign can be evaluated on its design
 * merits. `focal` is the object-position used when the image is cropped.
 */

export type ConceptImage = {
  src: string;
  width: number;
  height: number;
  /** Desktop object-position. */
  focal: string;
  /** Mobile object-position — portrait crops often need a different anchor. */
  focalMobile?: string;
  source: string;
};

export const img = {
  villaTerrace: {
    src: "/concept/villa-terrace.jpg",
    width: 2560,
    height: 1708,
    focal: "50% 55%",
    focalMobile: "62% 60%",
    source: "pexels.com/photo/12715492",
  },
  travertineCorridor: {
    src: "/concept/travertine-corridor.jpg",
    width: 2560,
    height: 4251,
    focal: "50% 42%",
    focalMobile: "50% 45%",
    source: "pexels.com/photo/30205474",
  },
  stoneLiving: {
    src: "/concept/stone-living.jpg",
    width: 2560,
    height: 1707,
    focal: "55% 50%",
    focalMobile: "60% 50%",
    source: "pexels.com/photo/6908501",
  },
  travertineStair: {
    src: "/concept/travertine-stair.jpg",
    width: 2560,
    height: 3200,
    focal: "50% 50%",
    source: "pexels.com/photo/35361419",
  },
  marbleDetail: {
    src: "/concept/marble-detail.jpg",
    width: 2400,
    height: 2800,
    focal: "50% 45%",
    source: "pexels.com/photo/33599113",
  },
  andalusianVault: {
    src: "/concept/andalusian-vault.jpg",
    width: 2560,
    height: 3840,
    focal: "50% 40%",
    source: "pexels.com/photo/8118021",
  },
  villaEvening: {
    src: "/concept/villa-evening.jpg",
    width: 2560,
    height: 1707,
    focal: "50% 55%",
    source: "pexels.com/photo/12715585",
  },
  lightStudy: {
    src: "/concept/light-study.jpg",
    width: 2560,
    height: 3840,
    focal: "50% 45%",
    source: "pexels.com/photo/8533603",
  },
  materialStudy: {
    src: "/concept/material-study.jpg",
    width: 2560,
    height: 3840,
    focal: "45% 55%",
    source: "pexels.com/photo/6825570",
  },
  warmLounge: {
    src: "/concept/warm-lounge.jpg",
    width: 2560,
    height: 1707,
    focal: "50% 55%",
    source: "pexels.com/photo/20337842",
  },
  villaThreshold: {
    src: "/concept/villa-threshold.jpg",
    width: 2560,
    height: 3838,
    focal: "45% 50%",
    source: "pexels.com/photo/35438897",
  },
  poolTerrace: {
    src: "/concept/pool-terrace.jpg",
    width: 2560,
    height: 1708,
    focal: "50% 60%",
    source: "pexels.com/photo/12715498",
  },
  archNiche: {
    src: "/concept/arch-niche.jpg",
    width: 2560,
    height: 3835,
    focal: "50% 50%",
    source: "pexels.com/photo/6615806",
  },
} satisfies Record<string, ConceptImage>;
