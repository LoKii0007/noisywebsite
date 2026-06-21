"use client";

import { useState } from "react";
import { cn } from "@/features/noise-bg/lib/cn";
import { VariantMeta } from "../data/variants";
import { NoiseBg } from "@/features/noise-bg/components/NoiseBg";
import { CodeBlock } from "./CodeBlock";
import { NoiseConfig } from "@/features/noise-bg/types";

interface VariantCardProps {
  meta: VariantMeta;
  config: NoiseConfig;
}

export function VariantCard({ meta, config }: VariantCardProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  const codeStr = `import { NoiseBg } from "@/features/noise-bg";

<NoiseBg
  variant="${meta.id}"
  intensity={${config.intensity ?? 0.5}}
  scale={${config.scale ?? 1}}
  speed={${config.speed ?? 8}}
  animated={${config.animated ?? true}}
  className="w-full h-64 bg-gradient-to-br ${meta.previewClass}"
>
  <div className="flex h-full items-center justify-center">
    <p className="text-white text-lg font-semibold">${meta.label}</p>
  </div>
</NoiseBg>`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h3 className="font-semibold text-white">{meta.label}</h3>
          <p className="mt-0.5 text-xs text-zinc-400">{meta.description}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tab switcher */}
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

      {/* Content */}
      <div className="p-4">
        {tab === "preview" ? (
          <NoiseBg
            variant={meta.id}
            {...config}
            className={cn(
              "h-52 w-full rounded-xl bg-gradient-to-br",
              meta.previewClass
            )}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <span className="text-base font-semibold text-white/90">{meta.label}</span>
              <span className="text-xs text-white/40">Hover to see animation</span>
            </div>
          </NoiseBg>
        ) : (
          <CodeBlock code={codeStr} filename="example.tsx" />
        )}
      </div>
    </div>
  );
}
