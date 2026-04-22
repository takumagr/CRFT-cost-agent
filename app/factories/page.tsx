import { FACTORIES } from "@/lib/factories";
import { REGION_LABELS } from "@/lib/types";
import Link from "next/link";
export default function FactoriesPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <h1 className="text-[32px] font-bold mb-8">工場データベース</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {FACTORIES.slice(0, 30).map((f) => (
          <div key={f.id} className="card">
            <span className="badge">{REGION_LABELS[f.region]}</span>
            <h3 className="mt-3 text-[15px] font-semibold">{f.name}</h3>
            <p className="mt-1 text-[12px] text-[var(--color-text-secondary)]">{f.description.slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
