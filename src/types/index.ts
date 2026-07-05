export interface IslandData {
  title_id: string;
  title_en: string;
  meta_id: string;
  meta_en: string;
  langs: string;
  unesco: string;
  desc_id: string;
  desc_en: string;
  image: string;
}

export interface LanguageData {
  name: string;
  region_id: string;
  region_en: string;
  status: "endangered" | "critical" | "vulnerable";
  script: string;
  phrase: string;
  translation_id: string;
  translation_en: string;
  alphabet: Array<{ native: string; roman: string; sound: string }>;
}

export interface ArtifactData {
  id: string;
  category: "sacred" | "textiles" | "weapons";
  title_id: string;
  title_en: string;
  origin_id: string;
  origin_en: string;
  era_id: string;
  era_en: string;
  desc_id: string;
  desc_en: string;
  image: string;
  hotspot_1_title_id: string;
  hotspot_1_title_en: string;
  hotspot_1_desc_id: string;
  hotspot_1_desc_en: string;
  hotspot_2_title_id: string;
  hotspot_2_title_en: string;
  hotspot_2_desc_id: string;
  hotspot_2_desc_en: string;
  h1_top: string;
  h1_left: string;
  h2_top: string;
  h2_left: string;
}

export interface HistoricalEvent {
  year: string;
  text_id: string;
  text_en: string;
}

export interface EraData {
  id: number;
  year: string;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  image: string;
  events: HistoricalEvent[];
  marquee: string[];
  color: string;
}

export interface AIResponse {
  id_user: string;
  en_user: string;
  id_ai: string;
  en_ai: string;
}

export type Locale = "id" | "en";
