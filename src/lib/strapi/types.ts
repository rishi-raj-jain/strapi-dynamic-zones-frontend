export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width?: number;
  height?: number;
}

export interface HeroBlock {
  __component: "hero.hero";
  id: number;
  heading?: string | null;
  subheading?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  image?: StrapiMedia | null;
}

export interface RichTextBlock {
  __component: "rich-text.rich-text";
  id: number;
  content?: string | null;
}

export interface FeatureItem {
  id: number;
  heading?: string | null;
  subtext?: string | null;
  image?: StrapiMedia | null;
}

export interface FeatureGridBlock {
  __component: "feature-grid.feature-grid";
  id: number;
  title?: string | null;
  feature?: FeatureItem[] | null;
}

export type DynamicZoneBlock =
  | HeroBlock
  | RichTextBlock
  | FeatureGridBlock;

export type BlockComponentUid = DynamicZoneBlock["__component"];

/** Layout entry returned by the page fetch — id + type only. */
export type BlockLayout = {
  id: number;
  __component: BlockComponentUid;
};

export type BlockShellProps = BlockLayout & {
  slug: string;
  status: "draft" | "published";
};

export interface PageLayout {
  documentId: string;
  title?: string | null;
  slug?: string | null;
  blocks?: BlockLayout[] | null;
}

export interface Page {
  documentId: string;
  title?: string | null;
  slug?: string | null;
  blocks?: DynamicZoneBlock[] | null;
}
