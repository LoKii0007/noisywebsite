import { cn } from "@/features/noise-bg/lib/cn";

interface PropRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  rows: PropRow[];
  className?: string;
}

export function PropsTable({ rows, className }: PropsTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-white/10", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="px-4 py-3 text-left font-medium text-zinc-300">Prop</th>
            <th className="px-4 py-3 text-left font-medium text-zinc-300">Type</th>
            <th className="px-4 py-3 text-left font-medium text-zinc-300">Default</th>
            <th className="px-4 py-3 text-left font-medium text-zinc-300">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.prop}
              className={cn(
                "border-b border-white/5 transition-colors hover:bg-white/5",
                i === rows.length - 1 && "border-b-0"
              )}
            >
              <td className="px-4 py-3">
                <code className="rounded bg-violet-500/10 px-1.5 py-0.5 text-xs text-violet-300">
                  {row.prop}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs text-fuchsia-300">{row.type}</code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs text-zinc-400">{row.default}</code>
              </td>
              <td className="px-4 py-3 text-zinc-400">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
