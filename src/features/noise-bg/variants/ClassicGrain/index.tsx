"use client";

import { CSSProperties } from "react";
import { cn } from "../../lib/cn";
import { NoiseConfig } from "../../types";

interface ClassicGrainProps extends NoiseConfig {
  className?: string;
  children?: React.ReactNode;
  absolute?: boolean;
}

export function ClassicGrain({
  intensity = 0.5,
  scale = 1,
  speed = 8,
  color,
  opacity = 1,
  blend = "soft-light",
  animated = true,
  className,
  children,
  absolute = false,
}: ClassicGrainProps) {
  const baseFreq = 0.4 + (1 - scale / 10) * 0.5;
  const noiseOpacity = intensity * opacity;

  const filterSvg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFreq.toFixed(3)}' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const noiseUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(filterSvg)}")`;

  const overlayStyle: CSSProperties = {
    backgroundImage: noiseUrl,
    opacity: noiseOpacity,
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
    ...(animated
      ? {
          animation: `classicGrainShift ${speed}s steps(${Math.round(speed * 6)}) infinite`,
        }
      : {}),
  };

  const tintStyle: CSSProperties = color
    ? { backgroundColor: color, mixBlendMode: "color" as CSSProperties["mixBlendMode"], opacity: 0.3 }
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
      <div className="pointer-events-none absolute inset-0 z-10" style={overlayStyle} />
    </div>
  );
}
