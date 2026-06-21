"use client";

import { useState } from "react";
import { NoiseBg } from "@/features/noise-bg/components/NoiseBg";
import { NoiseVariant, BlendMode } from "@/features/noise-bg/types";
import { VARIANTS } from "../data/variants";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/features/noise-bg/lib/cn";

const BLEND_MODES: BlendMode[] = [
  "normal", "multiply", "screen", "overlay", "soft-light", "hard-light", "color-dodge", "color-burn",
];

const BG_PRESETS = [
  { label: "Dark", value: "bg-gradient-to-br from-zinc-900 to-zinc-800" },
  { label: "Midnight", value: "bg-gradient-to-br from-slate-900 to-violet-950" },
  { label: "Warm", value: "bg-gradient-to-br from-orange-900 to-red-950" },
  { label: "Ocean", value: "bg-gradient-to-br from-blue-900 to-cyan-950" },
  { label: "Light", value: "bg-gradient-to-br from-stone-100 to-stone-200" },
  { label: "Emerald", value: "bg-gradient-to-br from-emerald-900 to-teal-950" },
];

function SliderRow({
  label, min, max, step, value, onChange,
}: {
  label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="font-mono text-violet-300">{value}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-violet-500"
      />
    </div>
  );
}

export function CustomizationPlayground() {
  const [variant, setVariant] = useState<NoiseVariant>("classic-grain");
  const [intensity, setIntensity] = useState(0.5);
  const [scale, setScale] = useState(1);
  const [speed, setSpeed] = useState(8);
  const [opacity, setOpacity] = useState(1);
  const [blend, setBlend] = useState<BlendMode>("soft-light");
  const [animated, setAnimated] = useState(true);
  const [bg, setBg] = useState(BG_PRESETS[0].value);
  const [tab, setTab] = useState<"preview" | "code">("preview");

  const code = `<NoiseBg
  variant="${variant}"
  intensity={${intensity}}
  scale={${scale}}
  speed={${speed}}
  opacity={${opacity}}
  blend="${blend}"
  animated={${animated}}
  className="w-full h-full"
/>`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-sm">
      <div className="border-b border-white/10 px-5 py-4">
        <h3 className="font-semibold text-white">Live Playground</h3>
        <p className="mt-0.5 text-xs text-zinc-400">Tweak every prop in real time</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px]">
        {/* Left: Preview */}
        <div className="flex flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="flex border-b border-white/10">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2 text-xs font-medium capitalize transition-colors",
                  tab === t
                    ? "border-b-2 border-violet-500 text-violet-300"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === "preview" ? (
              <>
                {/* BG preset row */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {BG_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setBg(p.value)}
                      className={cn(
                        "rounded-md border px-2 py-1 text-[10px] transition-colors",
                        bg === p.value
                          ? "border-violet-500 bg-violet-500/20 text-violet-300"
                          : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <NoiseBg
                  variant={variant}
                  intensity={intensity}
                  scale={scale}
                  speed={speed}
                  opacity={opacity}
                  blend={blend}
                  animated={animated}
                  className={cn("h-64 w-full rounded-xl", bg)}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-1">
                    <p className="text-sm font-semibold text-white/80">
                      {VARIANTS.find((v) => v.id === variant)?.label}
                    </p>
                    <p className="text-xs text-white/30">noise preview</p>
                  </div>
                </NoiseBg>
              </>
            ) : (
              <CodeBlock code={code} filename="NoiseBg.tsx" className="h-64" />
            )}
          </div>
        </div>

        {/* Right: Controls */}
        <div className="space-y-5 p-5">
          {/* Variant */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">Variant</label>
            <div className="grid grid-cols-2 gap-1.5">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariant(v.id)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition-colors",
                    variant === v.id
                      ? "border-violet-500 bg-violet-500/20 text-violet-200"
                      : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <SliderRow label="Intensity" min={0} max={1} step={0.05} value={intensity} onChange={setIntensity} />
            <SliderRow label="Scale" min={0.5} max={8} step={0.5} value={scale} onChange={setScale} />
            <SliderRow label="Speed (s)" min={1} max={30} step={1} value={speed} onChange={setSpeed} />
            <SliderRow label="Opacity" min={0} max={1} step={0.05} value={opacity} onChange={setOpacity} />
          </div>

          {/* Blend mode */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">Blend Mode</label>
            <select
              value={blend}
              onChange={(e) => setBlend(e.target.value as BlendMode)}
              className="w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-violet-500"
            >
              {BLEND_MODES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Animated toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Animated</span>
            <button
              onClick={() => setAnimated((v) => !v)}
              className={cn(
                "relative h-5 w-9 rounded-full transition-colors",
                animated ? "bg-violet-500" : "bg-zinc-700"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                  animated ? "translate-x-4" : "translate-x-0.5"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
