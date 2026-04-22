export type ProductCategory =
  | "beverage"
  | "snack"
  | "bakery"
  | "confectionery"
  | "frozen"
  | "retort"
  | "sauce"
  | "supplement"
  | "dairy"
  | "meat"
  | "seafood"
  | "cosmetics_oem";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  beverage: "飲料・ドリンク",
  snack: "スナック・菓子",
  bakery: "ベーカリー・パン",
  confectionery: "製菓・菓子",
  frozen: "冷凍食品",
  retort: "レトルト食品",
  sauce: "調味料・ソース・スパイス",
  supplement: "サプリメント・健康食品",
  dairy: "乳製品",
  meat: "食肉・加工食品",
  seafood: "水産・加工食品",
  cosmetics_oem: "化粧品・美容 OEM",
};

export type Certification =
  | "ISO22000"
  | "FSSC22000"
  | "HACCP"
  | "JAS_organic"
  | "halal"
  | "kosher"
  | "vegan"
  | "gluten_free"
  | "allergen_free"
  | "fair_trade"
  | "non_GMO";

export const CERT_LABELS: Record<Certification, string> = {
  ISO22000: "ISO 22000",
  FSSC22000: "FSSC 22000",
  HACCP: "HACCP",
  JAS_organic: "有機JAS",
  halal: "ハラール",
  kosher: "コーシャ",
  vegan: "ヴィーガン認証",
  gluten_free: "グルテンフリー",
  allergen_free: "アレルゲン除去対応",
  fair_trade: "フェアトレード",
  non_GMO: "遺伝子組み換えなし",
};

export type Packaging =
  | "bottle"
  | "can"
  | "pouch"
  | "paper_pack"
  | "jar"
  | "box"
  | "tray"
  | "individual_wrap"
  | "stick_pack"
  | "tube";

export const PACKAGING_LABELS: Record<Packaging, string> = {
  bottle: "PETボトル・瓶",
  can: "缶詰",
  pouch: "パウチ",
  paper_pack: "紙パック",
  jar: "ガラス・瓶・壺",
  box: "カートン箱",
  tray: "トレー",
  individual_wrap: "個別包装",
  stick_pack: "スティック",
  tube: "チューブ",
};

export type Region =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kansai"
  | "chugoku"
  | "shikoku"
  | "kyushu";

export const REGION_LABELS: Record<Region, string> = {
  hokkaido: "北海道",
  tohoku: "東北",
  kanto: "関東",
  chubu: "中部・東海",
  kansai: "関西",
  chugoku: "中国",
  shikoku: "四国",
  kyushu: "九州・沖縄",
};

export interface Factory {
  id: string;
  name: string;
  region: Region;
  prefecture: string;
  established: number;
  employees: number;
  categories: ProductCategory[];
  packagings: Packaging[];
  certifications: Certification[];
  specialties: string[];
  moqUnits: number;
  capacityPerMonth: number;
  leadTimeDaysMin: number;
  leadTimeDaysMax: number;
  priceIndex: number;
  rdSupport: boolean;
  smallBatchFriendly: boolean;
  privateLabel: boolean;
  exportExperience: boolean;
  description: string;
  highlights: string[];
  sampleClients: string[];
  sourceUrl?: string;
}

export interface RegistryEntry {
  id: string;
  name: string;
  kind: string;
  prefecture: string;
  city: string;
  street: string;
  region: string;
  zip: string;
  registered: string;
  homepage?: string;
}

export interface Brief {
  projectName?: string;
  category: ProductCategory | "";
  productConcept: string;
  targetAudience: string;
  packaging: Packaging | "";
  requiredCerts: Certification[];
  preferredRegions: Region[];
  targetUnits: number;
  budgetJpy: number;
  leadTimeDays: number;
  specialRequests: string[];
  needsRD: boolean;
  smallBatchOk: boolean;
  exportPlan: boolean;
}

export const SPECIAL_REQUESTS = [
  "ヴィーガン対応",
  "低糖質",
  "有機原料使用",
  "無添加",
  "オーガニック",
  "海外輸出",
  "少量対応",
  "白ロット",
  "研究開発",
  "オリジナルレシピ",
  "サステナブル包材",
  "高齢者対応",
] as const;

export interface MatchScore {
  factory: Factory;
  score: number;
  matches: {
    label: string;
    weight: number;
    passed: boolean;
    score: number;
    detail?: string;
  }[];
  reasoning: string;
  risks: string[];
}
