"use client";

import { CSSProperties } from "react";
import { cn } from "../../lib/cn";
import { NoiseConfig } from "../../types";

interface DotMatrixProps extends NoiseConfig {
  className?: string;
  children?: React.ReactNode;
  absolute?: boolean;
  dotSize?: number;
}

export function DotMatrix({
  intensity = 0.6,
  scale = 2,
  speed = 12,
  color = "#000000",
  opacity = 1,
  blend = "multiply",
  animated = true,
  dotSize = 2,
  className,
  children,
  absolute = false,
}: DotMatrixProps) {
  const spacing = Math.max(4, dotSize * scale * 2);
  const radius = Math.max(0.5, dotSize * 0.4);

  const dotSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='${spacing}' height='${spacing}'><circle cx='${spacing / 2}' cy='${spacing / 2}' r='${radius}' fill='${color}'/></svg>`;
  const dotUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(dotSvg)}")`;

  const baseFreq = 0.015 / Math.max(scale, 0.1);
  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFreq.toFixed(4)}' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const noiseUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}")`;

  const dotStyle: CSSProperties = {
    backgroundImage: dotUrl,
    backgroundSize: `${spacing}px ${spacing}px`,
    opacity: intensity * opacity,
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
  };

  const noiseStyle: CSSProperties = {
    backgroundImage: noiseUrl,
    opacity: intensity * 0.3,
    mixBlendMode: "overlay" as CSSProperties["mixBlendMode"],
    ...(animated
      ? {
          animation: `dotMatrixShift ${speed}s steps(${Math.round(speed * 3)}) infinite`,
        }
      : {}),
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
      <div className="pointer-events-none absolute inset-0 z-10" style={dotStyle} />
      <div className="pointer-events-none absolute inset-0 z-10" style={noiseStyle} />
    </div>
  );
}
