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

export interface Hotspot {
  id: string;
  /** Percentage from left edge of image container */
  x: number;
  /** Percentage from top edge of image container */
  y: number;
  /** Optional custom horizontal line length offset (percentage, e.g. -15 or 15) */
  length?: number;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  material_id?: string;
  material_en?: string;
  meaning_id?: string;
  meaning_en?: string;
}

export type ArtifactCategory =
  | "sacred"
  | "textiles"
  | "weapons"
  | "music"
  | "architecture";

export interface ArtifactData {
  id: string;
  category: ArtifactCategory;
  title_id: string;
  title_en: string;
  origin_id: string;
  origin_en: string;
  era_id: string;
  era_en: string;
  material_id: string;
  material_en: string;
  desc_id: string;
  desc_en: string;
  image: string;
  /** Optional UNESCO recognition status */
  unesco?: string;
  /** Array of interactive hotspot annotations on the artifact image */
  hotspots: Hotspot[];
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

export interface Ingredient {
  name_id: string;
  name_en: string;
}

export interface PreparationStep {
  step: number;
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
}

export interface CulturalMeaning {
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
}

export interface CulinaryFlavorProfile {
  spiciness: number; // 1 = Low, 2 = Medium, 3 = High
  sweetness: number;
  savory: number;
  richness: number;
  texture: number;
}

export interface CulinaryData {
  id: string;
  category: "main-dishes" | "traditional-cakes" | "snacks" | "beverages" | "traditional-condiments";
  title_id: string;
  title_en: string;
  province_id: string;
  province_en: string;
  description_id: string;
  description_en: string;
  history_id: string;
  history_en: string;
  ingredients: Ingredient[];
  preparation: PreparationStep[];
  culturalMeaning: CulturalMeaning[];
  recognition?: { title_id: string; title_en: string } | null;
  flavorProfile: CulinaryFlavorProfile;
  gallery: string[];
  relatedItems: string[];
}

