"use client";

import { CSSProperties } from "react";
import { cn } from "../../lib/cn";
import { NoiseConfig } from "../../types";

interface FrostedNoiseProps extends NoiseConfig {
  className?: string;
  children?: React.ReactNode;
  absolute?: boolean;
  blurAmount?: number;
}

export function FrostedNoise({
  intensity = 0.4,
  scale = 1,
  speed = 10,
  color = "rgba(255,255,255,0.1)",
  opacity = 1,
  blend = "overlay",
  animated = true,
  blurAmount = 8,
  className,
  children,
  absolute = false,
}: FrostedNoiseProps) {
  const baseFreq = 0.55 + (1 - Math.min(scale, 9) / 10) * 0.3;

  const filterSvg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFreq.toFixed(3)}' numOctaves='6' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const noiseUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(filterSvg)}")`;

  const glassStyle: CSSProperties = {
    backdropFilter: `blur(${blurAmount}px)`,
    WebkitBackdropFilter: `blur(${blurAmount}px)`,
    backgroundColor: color,
    opacity,
  };

  const grainStyle: CSSProperties = {
    backgroundImage: noiseUrl,
    opacity: intensity * 0.6,
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
    ...(animated
      ? {
          animation: `frostedShift ${speed}s steps(${Math.round(speed * 4)}) infinite`,
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
      <div className="pointer-events-none absolute inset-0 z-10" style={glassStyle} />
      <div className="pointer-events-none absolute inset-0 z-20" style={grainStyle} />
    </div>
  );
}
