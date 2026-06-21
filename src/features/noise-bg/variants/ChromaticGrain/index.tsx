"use client";

import { CSSProperties } from "react";
import { cn } from "../../lib/cn";
import { NoiseConfig } from "../../types";

interface ChromaticGrainProps extends NoiseConfig {
  className?: string;
  children?: React.ReactNode;
  absolute?: boolean;
}

export function ChromaticGrain({
  intensity = 0.5,
  scale = 1,
  speed = 6,
  opacity = 1,
  blend = "screen",
  animated = true,
  className,
  children,
  absolute = false,
}: ChromaticGrainProps) {
  const baseFreq = 0.35 + (1 - Math.min(scale, 9) / 10) * 0.4;

  const makeSvg = (seed: number) =>
    `url("data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFreq.toFixed(3)}' numOctaves='3' seed='${seed}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
    )}")`;

  const channelOpacity = (intensity * opacity * 0.5).toFixed(3);
  const animDur = speed;
  const steps = Math.round(speed * 5);

  const layerStyle = (seed: number, tint: string, offset: string): CSSProperties => ({
    backgroundImage: makeSvg(seed),
    opacity: parseFloat(channelOpacity),
    backgroundColor: tint,
    backgroundBlendMode: "multiply",
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
    transform: `translate(${offset})`,
    ...(animated
      ? { animation: `chromaticShift ${animDur}s steps(${steps}) infinite` }
      : {}),
  });

  return (
    <div
      className={cn(
        absolute ? "absolute inset-0" : "relative",
        "overflow-hidden",
        className
      )}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-10" style={layerStyle(0, "#ff0000", "-2px, 0")} />
      <div className="pointer-events-none absolute inset-0 z-10" style={layerStyle(1, "#00ff00", "0, 0")} />
      <div className="pointer-events-none absolute inset-0 z-10" style={layerStyle(2, "#0000ff", "2px, 0")} />
    </div>
  );
}
