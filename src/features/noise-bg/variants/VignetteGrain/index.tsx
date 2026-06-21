"use client";

import { CSSProperties } from "react";
import { cn } from "../../lib/cn";
import { NoiseConfig } from "../../types";

interface VignetteGrainProps extends NoiseConfig {
  className?: string;
  children?: React.ReactNode;
  absolute?: boolean;
  vignetteColor?: string;
  vignetteSpread?: number;
}

export function VignetteGrain({
  intensity = 0.5,
  scale = 1,
  speed = 8,
  color,
  opacity = 1,
  blend = "soft-light",
  animated = true,
  vignetteColor = "rgba(0,0,0,0.7)",
  vignetteSpread = 70,
  className,
  children,
  absolute = false,
}: VignetteGrainProps) {
  const baseFreq = 0.4 + (1 - Math.min(scale, 9) / 10) * 0.4;

  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFreq.toFixed(3)}' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
  const noiseUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}")`;

  const spread = Math.min(Math.max(vignetteSpread, 10), 100);

  const vignetteStyle: CSSProperties = {
    background: `radial-gradient(ellipse at center, transparent ${100 - spread}%, ${vignetteColor} 100%)`,
    opacity,
  };

  const grainStyle: CSSProperties = {
    backgroundImage: noiseUrl,
    opacity: intensity * opacity,
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
    ...(animated
      ? { animation: `vignetteGrainShift ${speed}s steps(${Math.round(speed * 6)}) infinite` }
      : {}),
  };

  const tintStyle: CSSProperties = color
    ? {
        backgroundColor: color,
        opacity: 0.2,
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
      <div className="pointer-events-none absolute inset-0 z-10" style={vignetteStyle} />
      <div className="pointer-events-none absolute inset-0 z-20" style={grainStyle} />
    </div>
  );
}
