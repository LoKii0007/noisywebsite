export type NoiseVariant =
  | "classic-grain"
  | "chromatic-grain"
  | "frosted-noise"
  | "dot-matrix"
  | "scanlines"
  | "crystalline"
  | "vignette-grain";

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "soft-light"
  | "hard-light"
  | "color-dodge"
  | "color-burn";

export interface NoiseConfig {
  /** Noise intensity 0–1 */
  intensity?: number;
  /** Noise grain size 0.1–10 */
  scale?: number;
  /** Animation speed in seconds. 0 = static */
  speed?: number;
  /** Tint color (CSS color string) */
  color?: string;
  /** Overall opacity 0–1 */
  opacity?: number;
  /** CSS mix-blend-mode */
  blend?: BlendMode;
  /** Animated noise */
  animated?: boolean;
}

export interface NoiseBgProps extends NoiseConfig {
  variant?: NoiseVariant;
  className?: string;
  children?: React.ReactNode;
  /** Fill the parent absolutely */
  absolute?: boolean;
}
