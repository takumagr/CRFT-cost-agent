"use client";

import { Brief } from "./types";

export interface SavedMatch {
  id: string; // 短いID
  q: string; // encoded brief
  brief: Brief;
  createdAt: number;
  topFactoryName?: string;
  topScore?: number;
  factoryCount?: number;
  label?: string;
}