import type { RegistryEntry } from "./types";

export function loadRegistry(): RegistryEntry[] {
  return [];
}

export interface RegistrySearchParams {
  q?: string;
  pref?: string;
  region?: string;
  kind?: string;
  hasHp?: boolean;
  page?: number;
  pageSize?: number;
}

export interface RegistrySearchResult {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  entries: RegistryEntry[];
  aggregates: {
    byPref: { name: string; count: number }[];
    byKind: { name: string; count: number }[];
    byRegion: { name: string; count: number }[];
  };
}

export function searchRegistry(p: RegistrySearchParams): RegistrySearchResult {
  const page = Math.max(1, p.page ?? 1);
  const pageSize = Math.max(1, Math.min(100, p.pageSize ?? 30));
  return {
    total: 0,
    page,
    pageSize,
    totalPages: 0,
    entries: [],
    aggregates: { byPref: [], byKind: [], byRegion: [] },
  };
}

export function registryTotal(): number {
  return 0;
}

export function registryHpCount(): number {
  return 0;
}

export function findRegistryById(_id: string): RegistryEntry | null {
  return null;
}
