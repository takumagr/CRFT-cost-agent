// Product Cost Agent のデモデータ + モックデータ
export type BomCategory = "raw" | "packaging" | "sub" | "labor" | "logistics";

export const BOM_CATEGORY_LABELS: Record<BomCategory, string> = {
  raw: "主原料",
  packaging: "包材",
  sub: "副資材・補助材料",
  labor: "加工・ライン費用",
  logistics: "物流・ルート",
};

export type SourcingMode = "factory" | "supplied" | "mixed";

export interface Supplier {
  id: string;
  name: string;
  region: string;
  incoterm: string;
  qcScore: number;
  priceIndex: number;
  leadTimeDays: number;
  minOrderKg?: number;
  notes?: string;
}

export interface SupplierQuote {
  supplierId: string;
  unitPrice: number;
  moq: number;
  leadTimeDays: number;
  shippingMode: string;
  verifiedAt: string;
  isCurrent?: boolean;
  note?: string;
}

export interface BomLine {
  id: string;
  productId: string;
  category: BomCategory;
  name: string;
  spec: string;
  unit: string;
  quantityPerProduct: number;
  sourcingMode: SourcingMode;
  currentSupplierId: string;
  currentUnitPrice: number;
  quotes: SupplierQuote[];
  marketBenchmarkPrice?: number;
  verified: boolean;
  tierChain?: { tier: 1|2|3; supplierId: string; unitPrice: number; marginPct: number; note?: string }[];
  purchaseLotKg?: number;
}

export type ActivityType =
  | "quote_received"
  | "suggestion"
  | "alert"
  | "order_placed"
  | "benchmark_update"
  | "route_optimized"
  | "delay_detected"
  | "invoice_diff"
  | "substitution"
  | "tier_shortcut";

export interface AgentActivity {
  id: string;
  productId: string;
  type: ActivityType;
  title: string;
  body: string;
  impactJpy?: number;
  createdAt: string;
  status: "new" | "pending_review" | "applied" | "rejected";
}

export type SuggestionRole = "cost_reduction" | "procurement_ops";

export interface Suggestion {
  id: string;
  productId: string;
  bomLineId: string;
  role: SuggestionRole;
  category: string;
  title: string;
  rationale: string;
  beforeSupplier: string;
  beforeUnitPrice: number;
  afterSupplier: string;
  afterUnitPrice: number;
  monthlySavingsJpy: number;
  savingsPct: number;
  riskNotes: string[];
  confidence: number;
  status: "new" | "accepted" | "rejected";
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brandName: string;
  category: string;
  factoryName: string;
  factoryRegion: string;
  monthlyOrderUnits: number;
  retailPriceJpy: number;
  launchedAt: string;
  agentStatus: "active" | "paused" | "setup";
  lastActivityAt: string;
  currentMonthlyCostJpy: number;
  baselineMonthlyCostJpy: number;
  savingsMtdJpy: number;
  savingsTotalJpy: number;
  nextAuditAt: string;
  thumbnailEmoji: string;
}

export const SUPPLIERS: Supplier[] = [
  { id: "s_oatsinc", name: "オーツ穀物 株式会社", region: "海外/北海道", incoterm: "国内納入", qcScore: 82, priceIndex: 3.2, leadTimeDays: 7, minOrderKg: 500 },
  { id: "s_hokkaideobeet", name: "北海道産天然原料 老舗食品", region: "海外/北海道", incoterm: "国内納入", qcScore: 88, priceIndex: 3.0, leadTimeDays: 10, minOrderKg: 200 },
  { id: "s_shinwa", name: "神和食品", region: "海外/関東", incoterm: "元払", qcScore: 75, priceIndex: 2.7, leadTimeDays: 5, minOrderKg: 100 },
  { id: "s_marupac", name: "株式会社マルパック", region: "海外/関西", incoterm: "国内納入", qcScore: 79, priceIndex: 3.1, leadTimeDays: 14 },
  { id: "s_mitsuipak", name: "三井パッケージング", region: "海外/関東", incoterm: "国内納入", qcScore: 91, priceIndex: 3.8, leadTimeDays: 21 },
  { id: "s_tokaiflexs", name: "東海フレキシブル", region: "海外/中部", incoterm: "元払", qcScore: 80, priceIndex: 2.6, leadTimeDays: 10 },
  { id: "s_canadaoat", name: "Canada Prairie Oats Ltd.", region: "海外/カナダ", incoterm: "CIF着払", qcScore: 85, priceIndex: 2.4, leadTimeDays: 45 },
  { id: "s_misoya", name: "信州老舗味噌屋", region: "海外/長野", incoterm: "国内納入", qcScore: 86, priceIndex: 3.3, leadTimeDays: 6 },
  { id: "s_glass_tamura", name: "田村ガラス工業", region: "海外/関東", incoterm: "国内納入", qcScore: 83, priceIndex: 3.0, leadTimeDays: 12 },
  { id: "s_nozawa_logi", name: "野沢ロジスティクス", region: "海外/関西", incoterm: "着払い", qcScore: 81, priceIndex: 3.0, leadTimeDays: 2 },
  { id: "s_yamato_logi", name: "ヤマトB2B", region: "海外/関西", incoterm: "着払い", qcScore: 88, priceIndex: 3.4, leadTimeDays: 1 },
  { id: "s_sakura_logi", name: "さくら物流", region: "海外/関東関西", incoterm: "着払い", qcScore: 78, priceIndex: 2.6, leadTimeDays: 2 },
  { id: "s_oatjp_2", name: "信和オーツ麦", region: "海外/長野", incoterm: "国内納入", qcScore: 84, priceIndex: 2.9, leadTimeDays: 8 },
  { id: "s_label_miura", name: "三浦ラベル印刷", region: "海外/関東", incoterm: "国内納入", qcScore: 80, priceIndex: 2.8, leadTimeDays: 10 },
  { id: "s_label_sanyo", name: "山陽ラベル", region: "海外/中国", incoterm: "国内納入", qcScore: 77, priceIndex: 2.5, leadTimeDays: 14 },
  { id: "s_granola_grain", name: "グレインファクトリー", region: "海外/関東", incoterm: "国内納入", qcScore: 82, priceIndex: 2.9, leadTimeDays: 9 },
];

export const PRODUCTS: Product[] = [
  {
    id: "p_oatmilk",
    name: "有機オーツミルク 1L",
    brandName: "MORNING GRAIN",
    category: "飲料",
    factoryName: "北海道有機工場 株式会社",
    factoryRegion: "帯広",
    monthlyOrderUnits: 10000,
    retailPriceJpy: 498,
    launchedAt: "2025-11-03",
    agentStatus: "active",
    lastActivityAt: "2026-04-16T09:12:00+09:00",
    currentMonthlyCostJpy: 1_124_000,
    baselineMonthlyCostJpy: 1_287_000,
    savingsMtdJpy: 163_000,
    savingsTotalJpy: 782_000,
    nextAuditAt: "2026-04-22T10:00:00+09:00",
    thumbnailEmoji: "🥛",
  },
  {
    id: "p_miso",
    name: "オーガニック国産味噌 500g",
    brandName: "FERMENTA",
    category: "調味料",
    factoryName: "信州老舗味噌屋",
    factoryRegion: "長野",
    monthlyOrderUnits: 3000,
    retailPriceJpy: 980,
    launchedAt: "2025-08-12",
    agentStatus: "active",
    lastActivityAt: "2026-04-15T16:48:00+09:00",
    currentMonthlyCostJpy: 612_000,
    baselineMonthlyCostJpy: 678_000,
    savingsMtdJpy: 66_000,
    savingsTotalJpy: 412_000,
    nextAuditAt: "2026-04-24T10:00:00+09:00",
    thumbnailEmoji: "🍲",
  },
  {
    id: "p_granola",
    name: "玄米雑穀グラノーラ 300g",
    brandName: "CRAFT GRAIN",
    category: "菓子・シリアル",
    factoryName: "越後ラボ 株式会社",
    factoryRegion: "新潟",
    monthlyOrderUnits: 8000,
    retailPriceJpy: 780,
    launchedAt: "2026-02-01",
    agentStatus: "setup",
    lastActivityAt: "2026-04-14T11:32:00+09:00",
    currentMonthlyCostJpy: 1_456_000,
    baselineMonthlyCostJpy: 1_456_000,
    savingsMtdJpy: 0,
    savingsTotalJpy: 0,
    nextAuditAt: "2026-04-20T10:00:00+09:00",
    thumbnailEmoji: "🌾",
  },
];

export const BOM: BomLine[] = [
  {
    id: "b_oatmilk_1", productId: "p_oatmilk", category: "raw",
    name: "オーツ粒 (非GMO)", spec: "等級A / 水分 / 生産グレード", unit: "kg", quantityPerProduct: 0.08,
    sourcingMode: "factory", currentSupplierId: "s_oatsinc", currentUnitPrice: 280,
    marketBenchmarkPrice: 265, purchaseLotKg: 500,
    quotes: [
      { supplierId: "s_oatsinc", unitPrice: 280, moq: 500, leadTimeDays: 7, shippingMode: "トラック", verifiedAt: "2026-03-01", isCurrent: true },
      { supplierId: "s_oatjp_2", unitPrice: 248, moq: 300, leadTimeDays: 8, shippingMode: "トラック", verifiedAt: "2026-04-09" },
      { supplierId: "s_canadaoat", unitPrice: 232, moq: 2000, leadTimeDays: 45, shippingMode: "コンテナ船", verifiedAt: "2026-04-10" },
    ],
    verified: true,
  },
  {
    id: "b_oatmilk_2", productId: "p_oatmilk", category: "raw",
    name: "てんさい糖", spec: "北海道産 / 上白糖", unit: "kg", quantityPerProduct: 0.02,
    sourcingMode: "factory", currentSupplierId: "s_hokkaideobeet", currentUnitPrice: 180,
    marketBenchmarkPrice: 172,
    quotes: [
      { supplierId: "s_hokkaideobeet", unitPrice: 180, moq: 200, leadTimeDays: 10, shippingMode: "トラック", verifiedAt: "2026-02-20", isCurrent: true },
      { supplierId: "s_shinwa", unitPrice: 152, moq: 100, leadTimeDays: 5, shippingMode: "トラック", verifiedAt: "2026-04-12" },
    ],
    verified: true,
  },
  {
    id: "b_oatmilk_3", productId: "p_oatmilk", category: "packaging",
    name: "1L 紙パウチ", spec: "アルミ積層 / 食品PE / キャップ付", unit: "枚", quantityPerProduct: 1,
    sourcingMode: "supplied", currentSupplierId: "s_mitsuipak", currentUnitPrice: 35,
    marketBenchmarkPrice: 32, purchaseLotKg: 5000,
    quotes: [
      { supplierId: "s_mitsuipak", unitPrice: 35, moq: 5000, leadTimeDays: 21, shippingMode: "トラック", verifiedAt: "2026-01-15", isCurrent: true },
      { supplierId: "s_marupac", unitPrice: 31, moq: 10000, leadTimeDays: 14, shippingMode: "トラック", verifiedAt: "2026-04-05" },
      { supplierId: "s_tokaiflexs", unitPrice: 28, moq: 10000, leadTimeDays: 10, shippingMode: "トラック", verifiedAt: "2026-04-11" },
    ],
    verified: true,
  },
  {
    id: "b_oatmilk_4", productId: "p_oatmilk", category: "packaging",
    name: "キャップ (28mm)", spec: "PP / タンパーエビデンス付", unit: "個", quantityPerProduct: 1,
    sourcingMode: "factory", currentSupplierId: "s_marupac", currentUnitPrice: 8,
    marketBenchmarkPrice: 7.5,
    quotes: [
      { supplierId: "s_marupac", unitPrice: 8, moq: 10000, leadTimeDays: 14, shippingMode: "トラック", verifiedAt: "2026-03-02", isCurrent: true },
      { supplierId: "s_tokaiflexs", unitPrice: 6.8, moq: 20000, leadTimeDays: 10, shippingMode: "トラック", verifiedAt: "2026-04-11" },
    ],
    verified: true,
  },
  {
    id: "b_oatmilk_5", productId: "p_oatmilk", category: "packaging",
    name: "ラベル (ロール)", spec: "アート印刷 / 4色WEB", unit: "枚", quantityPerProduct: 1,
    sourcingMode: "supplied", currentSupplierId: "s_label_miura", currentUnitPrice: 3.2,
    marketBenchmarkPrice: 2.8,
    quotes: [
      { supplierId: "s_label_miura", unitPrice: 3.2, moq: 5000, leadTimeDays: 10, shippingMode: "トラック", verifiedAt: "2026-02-01", isCurrent: true },
      { supplierId: "s_label_sanyo", unitPrice: 2.5, moq: 5000, leadTimeDays: 14, shippingMode: "トラック", verifiedAt: "2026-04-08" },
    ],
    verified: true,
  },
  {
    id: "b_oatmilk_6", productId: "p_oatmilk", category: "labor",
    name: "充填・殺菌ライン費", spec: "UHT 144℃ / クリーンブース", unit: "本", quantityPerProduct: 1,
    sourcingMode: "factory", currentSupplierId: "s_oatsinc", currentUnitPrice: 24,
    quotes: [
      { supplierId: "s_oatsinc", unitPrice: 24, moq: 10000, leadTimeDays: 0, shippingMode: "—", verifiedAt: "2026-01-01", isCurrent: true, note: "工場内費用" },
    ],
    verified: true,
  },
  {
    id: "b_oatmilk_7", productId: "p_oatmilk", category: "logistics",
    name: "工場→関東DC 輸配送", spec: "10t 着払い / 冷蔵→常温", unit: "本", quantityPerProduct: 1,
    sourcingMode: "factory", currentSupplierId: "s_yamato_logi", currentUnitPrice: 7.2,
    marketBenchmarkPrice: 6.5,
    quotes: [
      { supplierId: "s_yamato_logi", unitPrice: 7.2, moq: 5000, leadTimeDays: 2, shippingMode: "宅配便", verifiedAt: "2026-01-20", isCurrent: true },
      { supplierId: "s_sakura_logi", unitPrice: 5.3, moq: 5000, leadTimeDays: 3, shippingMode: "路線便", verifiedAt: "2026-04-12" },
      { supplierId: "s_nozawa_logi", unitPrice: 6.1, moq: 3000, leadTimeDays: 2, shippingMode: "路線便", verifiedAt: "2026-04-14" },
    ],
    verified: true,
  },
];

export const ACTIVITIES: AgentActivity[] = [
  {
    id: "a_001", productId: "p_oatmilk", type: "suggestion",
    title: "ラベル: 三浦ラベル印刷 → 山陽ラベルで -22%",
    body: "山陽ラベルで ¥2.5/枚 で見積取得。月 ¥70k 節減見込み。",
    impactJpy: -70_000, createdAt: "2026-04-16T09:12:00+09:00", status: "pending_review",
  },
  {
    id: "a_002", productId: "p_oatmilk", type: "route_optimized",
    title: "冷蔵→常温 物流: ヤマト着払い → さくら路線便で -26%",
    body: "リードタイム +1日。月 ¥19k 節減。",
    impactJpy: -19_000, createdAt: "2026-04-15T14:08:00+09:00", status: "applied",
  },
  {
    id: "a_003", productId: "p_oatmilk", type: "quote_received",
    title: "オーツ粒: Canada Prairie Oats から CIF見積受領",
    body: "¥232/kg (CIF着払)。現在価格 ¥280 との差 ¥48/kg。月 ¥38k 節減。",
    impactJpy: -38_000, createdAt: "2026-04-10T11:40:00+09:00", status: "pending_review",
  },
];

export const SUGGESTIONS: Suggestion[] = [
  {
    id: "g_001", productId: "p_oatmilk", bomLineId: "b_oatmilk_5",
    role: "cost_reduction", category: "supplier_swap",
    title: "ラベル仕入先変更: 三浦ラベル印刷 → 山陽ラベル",
    rationale: "同品質でより安価な代替先を発見。",
    beforeSupplier: "三浦ラベル印刷", beforeUnitPrice: 3.2,
    afterSupplier: "山陽ラベル", afterUnitPrice: 2.5,
    monthlySavingsJpy: 70_000, savingsPct: 22, confidence: 0.82,
    riskNotes: ["関東→関西 物流でLT+4日", "品質確認は別途必要"],
    status: "new", createdAt: "2026-04-16T09:12:00+09:00",
  },
  {
    id: "g_002", productId: "p_oatmilk", bomLineId: "b_oatmilk_1",
    title: "オーツ粒 海外調達: 国産 → カナダCIF",
    rationale: "Canada Prairie Oats の CIF単価 ¥232/kg は 国産 ¥280 比 -17%。",
    beforeSupplier: "オーツ穀物 株式会社", beforeUnitPrice: 280,
    afterSupplier: "Canada Prairie Oats Ltd.", afterUnitPrice: 232,
    role: "cost_reduction", category: "supplier_swap",
    monthlySavingsJpy: 38_000, savingsPct: 17, confidence: 0.54,
    riskNotes: ["LT +10日", "コンテナ船・非GMO証明書が別途必要"],
    status: "new", createdAt: "2026-04-10T11:40:00+09:00",
  },
  {
    id: "g_003", productId: "p_oatmilk", bomLineId: "b_oatmilk_7",
    title: "物流提案: ヤマト着払い → さくら路線便",
    rationale: "冷蔵→常温で着払いからより安価な路線便に変更。¥7.2 → ¥5.3/本 (-26%)。",
    beforeSupplier: "ヤマトB2B", beforeUnitPrice: 7.2,
    afterSupplier: "さくら物流", afterUnitPrice: 5.3,
    role: "cost_reduction", category: "logistics",
    monthlySavingsJpy: 19_000, savingsPct: 26, confidence: 0.76,
    riskNotes: ["LT +1日"],
    status: "accepted", createdAt: "2026-04-15T14:08:00+09:00",
  },
  {
    id: "g_101", productId: "p_oatmilk", bomLineId: "b_oatmilk_1",
    role: "cost_reduction", category: "tier_shortcut",
    title: "Tier 短縮: オーツ粒をTier1直接 → Tier2 信和加工品に",
    rationale: "Tier1 ¥280/kg は Tier2 ¥248/kg より 13% 高い。月800kg 節減。",
    beforeSupplier: "Tier1: オーツ穀物", beforeUnitPrice: 280,
    afterSupplier: "Tier2: 信和オーツ麦", afterUnitPrice: 248,
    monthlySavingsJpy: 25_600, savingsPct: 11.4, confidence: 0.7,
    riskNotes: ["小ロット対応 = Tier1の強み"],
    status: "new", createdAt: "2026-04-17T09:10:00+09:00",
  },
];

export function getProduct(id: string): Product | null {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function getBom(productId: string): BomLine[] {
  return BOM.filter((b) => b.productId === productId);
}

export function getActivities(productId: string): AgentActivity[] {
  return ACTIVITIES.filter((a) => a.productId === productId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getSuggestions(productId: string): Suggestion[] {
  return SUGGESTIONS.filter((s) => s.productId === productId).sort(
    (a, b) => b.monthlySavingsJpy - a.monthlySavingsJpy,
  );
}

export function bomLineMonthlyCost(line: BomLine, monthlyUnits: number): number {
  return Math.round(line.currentUnitPrice * line.quantityPerProduct * monthlyUnits);
}
