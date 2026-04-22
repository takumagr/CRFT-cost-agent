import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FACTORIES } from "@/lib/factories";
import { REGION_LABELS } from "@/lib/types";
import { registryTotal } from "@/lib/registry";
import { PRODUCTS, SUGGESTIONS } from "@/lib/products";

export default function Home() {
  const totalCapacity = FACTORIES.reduce((a, f) => a + f.capacityPerMonth, 0);
  const regionCount = new Set(FACTORIES.map((f) => f.region)).size;
  const registryCount = registryTotal();
  const dbTotal = registryCount + FACTORIES.length;
  const savingsTotalAll = PRODUCTS.reduce((a, p) => a + p.savingsTotalJpy, 0);
  const costReductionSavings = SUGGESTIONS
    .filter((s) => s.role === "cost_reduction" && s.status === "new")
    .reduce((a, s) => a + s.monthlySavingsJpy, 0);

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "#0D0E11", color: "#F1F2F4" }}
        >
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 pt-24 pb-16">
            <h1 className="text-[40px] md:text-[64px] font-bold leading-[1.02] tracking-[-0.035em] max-w-[940px]">
              食品サプライチェーンの<br />
              <span style={{ color: "#7DD895" }}>Tier1〜3 を選定</span>して、<br />
              QCD を最適最安値する AI。
            </h1>
            <p className="mt-6 text-[17px] md:text-[18px] max-w-[680px] leading-[1.7]" style={{ color: "#B8BDD4" }}>
              CRFT Cost Agent は、OEM が定まった後の <strong style={{ color: "#F1F2F4" }}>見えない仕入単価</strong>
              （食品原料・ロットロス・リード時間・OCR読取・57種チェック・OCA運賃）を可視化。
              処理済み仕入先名簿からTier2/3 のマージン+ルートを24h 処理します。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[14px] font-semibold"
                style={{ background: "#3F8F52", color: "white" }}
              >
                Cost Agent を起動
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L7 3m4 4L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/brief"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-[14px] font-semibold"
                style={{ background: "transparent", color: "#F1F2F4", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                OEM マッチングを探す
              </Link>
            </div>

            {/* KPI */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "食品工場能力値DB", value: `${(dbTotal / 1000).toFixed(0)}k`, unit: "社", sub: "独自収集DBから厳選" },
                { label: "管理中 SKU", value: `${PRODUCTS.length}`, unit: "個", sub: "Cost Agent 処理中" },
                { label: "累計費用削減", value: `¥${(savingsTotalAll / 1_000_000).toFixed(2)}M`, unit: "", sub: "確認済み削減" },
                { label: "未実施の月次節減", value: `¥${(costReductionSavings / 1000).toFixed(0)}k`, unit: "/月", sub: "本部 承認待ち" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#8B8FA8" }}>
                    {s.label}
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-[32px] font-bold tracking-tight font-mono" style={{ color: "#F1F2F4" }}>
                      {s.value}
                    </span>
                    <span className="text-[13px]" style={{ color: "#8B8FA8" }}>{s.unit}</span>
                  </div>
                  <div className="mt-1 text-[11px]" style={{ color: "#8B8FA8" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured factories */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-accent)] mb-2">Featured factories</div>
              <h2 className="text-[32px] font-bold tracking-tight">提携工場の一部</h2>
            </div>
            <Link href="/factories" className="btn-ghost">すべて見る →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FACTORIES.slice(0, 6).map((f) => (
              <Link href={`/factories/${f.id}`} key={f.id} className="card block hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="badge">{REGION_LABELS[f.region]}</span>
                  <span className="text-[11px] text-[var(--color-text-secondary)] font-mono">
                    設立 {f.established}
                  </span>
                </div>
                <h3 className="mt-3 text-[16px] font-semibold leading-snug">{f.name}</h3>
                <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                  {f.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {f.specialties.slice(0, 3).map((s) => (
                    <span key={s} className="badge">{s}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
