import { CodeBlock } from "./CodeBlock";

const COPY_STEP_1 = `# 1. Copy the feature folder into your project
cp -r noise-bg src/features/`;

const COPY_STEP_2 = `# 2. Install peer dependencies
npm install clsx tailwind-merge`;

const USAGE_EXAMPLE = `import { NoiseBg } from "@/features/noise-bg";

// Wrap any element
<NoiseBg
  variant="vignette-grain"
  intensity={0.6}
  animated
  blend="soft-light"
  className="h-screen bg-gradient-to-br from-slate-900 to-violet-950"
>
  <YourContent />
</NoiseBg>

// Or use individual variants directly
import { ChromaticGrain } from "@/features/noise-bg";

<ChromaticGrain intensity={0.4} scale={1.5} className="h-64 bg-black">
  <Card />
</ChromaticGrain>`;

const ANIMATIONS_CSS = `/* Add to globals.css — noise animation keyframes */
@keyframes classicGrainShift {
  0%  { background-position: 0% 0%; }
  100%{ background-position: 100% 100%; }
}
@keyframes chromaticShift {
  0%  { transform: translate(-2px, 0); }
  50% { transform: translate(2px, 0); }
  100%{ transform: translate(-2px, 0); }
}`;

export function InstallationSection() {
  return (
    <section id="installation" className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
          Get started
        </div>
        <h2 className="mb-2 text-3xl font-bold text-white">Installation</h2>
        <p className="mb-10 text-zinc-400">
          NoisyBg is a copy-paste library — no npm package needed. Just drop the{" "}
          <code className="rounded bg-white/10 px-1 text-violet-300">noise-bg</code>{" "}
          feature folder into your project.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-200">1. Copy files</h3>
            <CodeBlock code={COPY_STEP_1} language="bash" />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-200">2. Install dependencies</h3>
            <CodeBlock code={COPY_STEP_2} language="bash" />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-200">3. Use it</h3>
            <CodeBlock code={USAGE_EXAMPLE} filename="page.tsx" />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-200">4. Add CSS keyframes</h3>
            <p className="mb-3 text-xs text-zinc-500">
              The noise variants rely on CSS animations defined in your global stylesheet.
            </p>
            <CodeBlock code={ANIMATIONS_CSS} filename="globals.css" language="css" />
          </div>
        </div>
      </div>
    </section>
  );
}
