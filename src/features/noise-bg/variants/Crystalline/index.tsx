"use client";

import { CSSProperties } from "react";
import { cn } from "../../lib/cn";
import { NoiseConfig } from "../../types";

interface CrystallineProps extends NoiseConfig {
  className?: string;
  children?: React.ReactNode;
  absolute?: boolean;
}

export function Crystalline({
  intensity = 0.6,
  scale = 3,
  speed = 15,
  color,
  opacity = 1,
  blend = "overlay",
  animated = true,
  className,
  children,
  absolute = false,
}: CrystallineProps) {
  const baseFreq = (0.008 / Math.max(scale, 0.5)).toFixed(4);
  const numOctaves = 1;

  const turbSvg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='turbulence' baseFrequency='${baseFreq}' numOctaves='${numOctaves}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const turbUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(turbSvg)}")`;

  const grainSvg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>`;
  const grainUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(grainSvg)}")`;

  const crystalStyle: CSSProperties = {
    backgroundImage: turbUrl,
    opacity: intensity * opacity,
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
    ...(animated
      ? { animation: `crystallineShift ${speed}s steps(${Math.round(speed * 2)}) infinite` }
      : {}),
  };

  const grainStyle: CSSProperties = {
    backgroundImage: grainUrl,
    opacity: intensity * 0.2 * opacity,
    mixBlendMode: "soft-light" as CSSProperties["mixBlendMode"],
  };

  const tintStyle: CSSProperties = color
    ? {
        backgroundColor: color,
        opacity: 0.25,
        mixBlendMode: "color" as CSSProperties["mixBlendMode"],
      }
    : {};

  return (
    <div
      className={cn(
        absolute ? "absolute inset-0" : "relative",
        "overflow-hidden",
        className
      )}
    >
      {children}
      {color && (
        <div className="pointer-events-none absolute inset-0 z-10" style={tintStyle} />
      )}
      <div className="pointer-events-none absolute inset-0 z-10" style={crystalStyle} />
      <div className="pointer-events-none absolute inset-0 z-10" style={grainStyle} />
    </div>
  );
}
