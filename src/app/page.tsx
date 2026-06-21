import { Navbar } from "@/features/showcase/components/Navbar";
import { Hero } from "@/features/showcase/components/Hero";
import { VariantCard } from "@/features/showcase/components/VariantCard";
import { CustomizationPlayground } from "@/features/showcase/components/CustomizationPlayground";
import { PropsTable } from "@/features/showcase/components/PropsTable";
import { InstallationSection } from "@/features/showcase/components/InstallationSection";
import { VARIANTS, PROPS_TABLE } from "@/features/showcase/data/variants";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <Hero />

      {/* Variants Grid */}
      <section id="variants" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
            Variants
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">
            7 noise patterns
          </h2>
          <p className="mb-10 max-w-2xl text-zinc-400">
            Every variant is powered by SVG{" "}
            <code className="rounded bg-white/10 px-1 text-fuchsia-300">
              feTurbulence
            </code>{" "}
            filters — no canvas, no WebGL, just CSS. Each is animated via
            keyframe shifts for a living texture feel.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {VARIANTS.map((meta) => (
              <VariantCard key={meta.id} meta={meta} config={{ intensity: 0.5, scale: 1, speed: 8, animated: true }} />
            ))}
          </div>
        </div>
      </section>

      {/* Playground */}
      <section id="customization" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
            Customization
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">
            Live Playground
          </h2>
          <p className="mb-10 text-zinc-400">
            Adjust every prop and see the result instantly.
          </p>
          <CustomizationPlayground />
        </div>
      </section>

      {/* Props API */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
            API
          </div>
          <h2 className="mb-2 text-3xl font-bold text-white">Props</h2>
          <p className="mb-10 text-zinc-400">
            All variants share the same prop interface via{" "}
            <code className="rounded bg-white/10 px-1 text-violet-300">
              NoiseBgProps
            </code>
            .
          </p>
          <PropsTable rows={PROPS_TABLE} />
        </div>
      </section>

      <InstallationSection />

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-zinc-500">
              Built with Next.js + Tailwind. SVG noise via{" "}
              <code className="text-zinc-400">feTurbulence</code>.
            </p>
            <p className="text-xs text-zinc-600">NoisyBg © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
