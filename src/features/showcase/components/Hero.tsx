"use client";

import { ClassicGrain } from "@/features/noise-bg/variants/ClassicGrain";
import { CodeBlock } from "./CodeBlock";

const INSTALL_CODE = `npm install @noisy/bg`;

const QUICK_START = `import { NoiseBg } from "@/features/noise-bg";

export default function App() {
  return (
    <NoiseBg
      variant="classic-grain"
      intensity={0.5}
      animated
      className="h-screen bg-zinc-900"
    >
      <h1 className="text-white text-4xl font-bold">Hello, Noise</h1>
    </NoiseBg>
  );
}`;

export function Hero() {
  return (
    <ClassicGrain
      intensity={0.35}
      animated
      speed={12}
      blend="soft-light"
      className="relative overflow-hidden bg-zinc-950 pt-28 pb-20"
    >
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            7 noise variants · Zero dependencies
          </span>
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Beautiful{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            noise backgrounds
          </span>{" "}
          for Next.js
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base text-zinc-400 sm:text-lg">
          A collection of{" "}
          <span className="text-zinc-200">SVG-powered grainy textures</span> with
          live customization. Drop them anywhere — cards, hero sections, UI overlays.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#variants"
            className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-500"
          >
            Browse variants
          </a>
          <a
            href="#installation"
            className="rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
          >
            Get started →
          </a>
        </div>

        {/* Code snippet preview */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <CodeBlock code={INSTALL_CODE} filename="Terminal" language="bash" />
          <CodeBlock code={QUICK_START} filename="app/page.tsx" />
        </div>
      </div>
    </ClassicGrain>
  );
}
