import type { ArtKind } from "@/components/Art";

export type Category = "exterior" | "interior" | "correction" | "coating";

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: Category;
  kind: ArtKind;
  variant: number;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "correction", label: "Correction" },
  { id: "coating", label: "Coating" },
];

export const gallery: GalleryItem[] = [
  { id: "profile-1", title: "Profile reflection study", caption: "A clean shoulder line carrying a single, unbroken reflection from nose to tail.", category: "exterior", kind: "profile", variant: 0 },
  { id: "wheel-1", title: "Wheel and tire finish", caption: "Brake dust removed from every spoke, with a clean, even tire dressing.", category: "exterior", kind: "wheel", variant: 0 },
  { id: "hood-1", title: "Hood line clarity", caption: "Overhead light bars reflected cleanly along a decontaminated hood.", category: "exterior", kind: "hood", variant: 0 },
  { id: "cabin-1", title: "Cockpit reset", caption: "Instrument cluster, steering wheel and trim cleaned without gloss or residue.", category: "interior", kind: "cabin", variant: 0 },
  { id: "seat-1", title: "Leather cleaned and conditioned", caption: "Stitching and perforations cleaned, with a soft, even satin finish.", category: "interior", kind: "seat", variant: 0 },
  { id: "seat-2", title: "Quilted seat detail", caption: "Diamond-stitch bolsters cleaned along every seam.", category: "interior", kind: "seat", variant: 1 },
  { id: "swirl-1", title: "Swirl-reduction test section", caption: "A 50/50 test section showing marred paint beside corrected paint.", category: "correction", kind: "swirl", variant: 0 },
  { id: "hood-2", title: "Machine-polished hood", caption: "Fine swirl marks refined so reflections hold their shape.", category: "correction", kind: "hood", variant: 1 },
  { id: "beads-1", title: "Hydrophobic beading", caption: "Tight, uniform water beads on freshly coated paint.", category: "coating", kind: "beads", variant: 0 },
  { id: "profile-2", title: "Ceramic-coated profile", caption: "Depth and gloss on a coated finish, ready for the Arizona sun.", category: "coating", kind: "profile", variant: 1 },
];

export const comparisons: { id: string; label: string; kind: ArtKind; variant: number; subject: string }[] = [
  { id: "hood", label: "Hood correction", kind: "hood", variant: 0, subject: "hood paint correction" },
  { id: "profile", label: "Full exterior", kind: "profile", variant: 0, subject: "full exterior detail" },
  { id: "wheel", label: "Wheel", kind: "wheel", variant: 0, subject: "wheel and caliper cleaning" },
  { id: "cabin", label: "Interior", kind: "cabin", variant: 0, subject: "interior cockpit reset" },
];
