"use client";

import { CSSProperties } from "react";
import { cn } from "../../lib/cn";
import { NoiseConfig } from "../../types";

interface ScanlinesProps extends NoiseConfig {
  className?: string;
  children?: React.ReactNode;
  absolute?: boolean;
  lineHeight?: number;
}

export function Scanlines({
  intensity = 0.5,
  scale = 1,
  speed = 8,
  color = "#000000",
  opacity = 1,
  blend = "multiply",
  animated = true,
  lineHeight = 2,
  className,
  children,
  absolute = false,
}: ScanlinesProps) {
  const gap = Math.max(lineHeight, 1) * Math.max(scale, 0.5) * 2;
  const lineW = Math.max(1, lineHeight * 0.5);

  const lineSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='1' height='${gap}'><rect width='1' height='${lineW}' fill='${color}' opacity='${intensity}'/></svg>`;
  const lineUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(lineSvg)}")`;

  const baseFreq = 0.4;
  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFreq}' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const noiseUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}")`;

  const lineStyle: CSSProperties = {
    backgroundImage: lineUrl,
    backgroundSize: `1px ${gap}px`,
    opacity: opacity,
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
    ...(animated
      ? { animation: `scanlinesScroll ${speed}s linear infinite` }
      : {}),
  };

  const grainStyle: CSSProperties = {
    backgroundImage: noiseUrl,
    opacity: intensity * 0.25 * opacity,
    mixBlendMode: "overlay" as CSSProperties["mixBlendMode"],
  };

  return (
    <div
      className={cn(
        absolute ? "absolute inset-0" : "relative",
        "overflow-hidden",
        className
      )}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-10" style={lineStyle} />
      <div className="pointer-events-none absolute inset-0 z-10" style={grainStyle} />
    </div>
  );
}
