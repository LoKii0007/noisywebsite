import { NoiseVariant } from "@/features/noise-bg/types";

export interface VariantMeta {
  id: NoiseVariant;
  label: string;
  description: string;
  tags: string[];
  defaultBg: string;
  previewClass: string;
}

export const VARIANTS: VariantMeta[] = [
  {
    id: "classic-grain",
    label: "Classic Grain",
    description:
      "Timeless film-grain texture using fractal noise. Works beautifully over any background.",
    tags: ["subtle", "film", "texture"],
    defaultBg: "bg-zinc-900",
    previewClass: "from-zinc-900 to-zinc-700",
  },
  {
    id: "chromatic-grain",
    label: "Chromatic Grain",
    description:
      "RGB channel-separated noise layers that create a vivid chromatic aberration grain effect.",
    tags: ["vivid", "rgb", "aberration"],
    defaultBg: "bg-black",
    previewClass: "from-black to-slate-900",
  },
  {
    id: "frosted-noise",
    label: "Frosted Noise",
    description:
      "Backdrop blur combined with fine grain — perfect for glass-morphism UIs.",
    tags: ["glass", "blur", "modern"],
    defaultBg: "bg-blue-900",
    previewClass: "from-blue-900 to-indigo-900",
  },
  {
    id: "dot-matrix",
    label: "Dot Matrix",
    description:
      "Halftone-inspired dot grid pattern with subtle noise variation. Great for retro or print aesthetics.",
    tags: ["halftone", "retro", "pattern"],
    defaultBg: "bg-stone-100",
    previewClass: "from-stone-50 to-stone-200",
  },
  {
    id: "scanlines",
    label: "Scanlines",
    description:
      "CRT monitor scanline effect with subtle grain for an analogue, cinematic look.",
    tags: ["crt", "retro", "cinematic"],
    defaultBg: "bg-neutral-900",
    previewClass: "from-neutral-900 to-neutral-800",
  },
  {
    id: "crystalline",
    label: "Crystalline",
    description:
      "Large-scale turbulence patterns mimicking crystal facets or northern lights interference.",
    tags: ["abstract", "artistic", "bold"],
    defaultBg: "bg-violet-950",
    previewClass: "from-violet-950 to-purple-900",
  },
  {
    id: "vignette-grain",
    label: "Vignette Grain",
    description:
      "Classic vignette darkening around edges combined with film grain for a cinematic feel.",
    tags: ["cinematic", "vignette", "moody"],
    defaultBg: "bg-slate-800",
    previewClass: "from-slate-700 to-slate-900",
  },
];

export const PROPS_TABLE = [
  {
    prop: "variant",
    type: "NoiseVariant",
    default: '"classic-grain"',
    description: "The noise pattern variant to render",
  },
  {
    prop: "intensity",
    type: "number",
    default: "0.5",
    description: "Noise strength (0–1)",
  },
  {
    prop: "scale",
    type: "number",
    default: "1",
    description: "Grain size (0.1–10)",
  },
  {
    prop: "speed",
    type: "number",
    default: "8",
    description: "Animation cycle duration in seconds. 0 = static",
  },
  {
    prop: "animated",
    type: "boolean",
    default: "true",
    description: "Enable/disable noise animation",
  },
  {
    prop: "color",
    type: "string",
    default: "undefined",
    description: "Tint overlay color (any CSS color)",
  },
  {
    prop: "opacity",
    type: "number",
    default: "1",
    description: "Overall layer opacity (0–1)",
  },
  {
    prop: "blend",
    type: "BlendMode",
    default: '"soft-light"',
    description: "CSS mix-blend-mode for the noise layer",
  },
  {
    prop: "absolute",
    type: "boolean",
    default: "false",
    description: "Position the noise layer absolutely within parent",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes applied to wrapper",
  },
];
