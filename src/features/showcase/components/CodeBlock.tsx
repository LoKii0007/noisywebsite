"use client";

import { useState } from "react";
import { cn } from "@/features/noise-bg/lib/cn";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950", className)}>
      {filename && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-zinc-400">{filename}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 z-10 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-300">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}
