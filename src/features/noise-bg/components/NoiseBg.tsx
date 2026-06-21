"use client";

import { NoiseBgProps, NoiseVariant } from "../types";
import { ClassicGrain } from "../variants/ClassicGrain";
import { ChromaticGrain } from "../variants/ChromaticGrain";
import { FrostedNoise } from "../variants/FrostedNoise";
import { DotMatrix } from "../variants/DotMatrix";
import { Scanlines } from "../variants/Scanlines";
import { Crystalline } from "../variants/Crystalline";
import { VignetteGrain } from "../variants/VignetteGrain";

const variantMap: Record<
  NoiseVariant,
  React.ComponentType<NoiseBgProps>
> = {
  "classic-grain": ClassicGrain as React.ComponentType<NoiseBgProps>,
  "chromatic-grain": ChromaticGrain as React.ComponentType<NoiseBgProps>,
  "frosted-noise": FrostedNoise as React.ComponentType<NoiseBgProps>,
  "dot-matrix": DotMatrix as React.ComponentType<NoiseBgProps>,
  scanlines: Scanlines as React.ComponentType<NoiseBgProps>,
  crystalline: Crystalline as React.ComponentType<NoiseBgProps>,
  "vignette-grain": VignetteGrain as React.ComponentType<NoiseBgProps>,
};

export function NoiseBg({
  variant = "classic-grain",
  ...props
}: NoiseBgProps) {
  const Component = variantMap[variant];
  return <Component {...props} />;
}
