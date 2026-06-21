export function buildSvgNoiseFilter(
  id: string,
  options: {
    baseFrequency?: number;
    numOctaves?: number;
    seed?: number;
    stitchTiles?: "stitch" | "noStitch";
    type?: "fractalNoise" | "turbulence";
  } = {}
): string {
  const {
    baseFrequency = 0.65,
    numOctaves = 3,
    seed = 0,
    stitchTiles = "stitch",
    type = "fractalNoise",
  } = options;

  return `<svg xmlns='http://www.w3.org/2000/svg' width='0' height='0'>
    <filter id='${id}' x='0%' y='0%' width='100%' height='100%' color-interpolation-filters='linearRGB'>
      <feTurbulence
        type='${type}'
        baseFrequency='${baseFrequency}'
        numOctaves='${numOctaves}'
        seed='${seed}'
        stitchTiles='${stitchTiles}'
        result='noise'
      />
      <feColorMatrix type='saturate' values='0' in='noise' result='greyNoise'/>
      <feBlend in='SourceGraphic' in2='greyNoise' mode='multiply'/>
    </filter>
  </svg>`;
}

export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function buildNoiseSvgDataUri(
  baseFrequency = 0.65,
  numOctaves = 3,
  seed = 0
): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg'>
    <filter id='n' x='0%' y='0%' width='100%' height='100%'>
      <feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' seed='${seed}' stitchTiles='stitch'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

export function buildTurbulenceSvgDataUri(
  baseFrequency = 0.65,
  numOctaves = 3,
  seed = 0
): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg'>
    <filter id='n' x='0%' y='0%' width='100%' height='100%'>
      <feTurbulence type='turbulence' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' seed='${seed}' stitchTiles='stitch'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}
