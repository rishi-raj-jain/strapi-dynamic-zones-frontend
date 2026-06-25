import qs from "qs";
import type { BlockComponentUid } from "./types";

/** Full population per block type — used when a block fetches its own data. */
export const blockPopulateByComponent = {
  "hero.hero": {
    populate: {
      image: {
        fields: ["url", "alternativeText", "width", "height"],
      },
    },
  },
  "rich-text.rich-text": true,
  "feature-grid.feature-grid": {
    populate: {
      feature: {
        populate: {
          image: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
    },
  },
} as const;

/** Layout-only population — block ids and types, no nested media. */
export const pageLayoutPopulate = {
  blocks: {
    on: {
      "hero.hero": { fields: ["id"] },
      "rich-text.rich-text": { fields: ["id"] },
      "feature-grid.feature-grid": { fields: ["id"] },
    },
  },
} as const;

/** @deprecated Use pageLayoutPopulate + blockPopulateByComponent for streaming fetches. */
export const pageBlocksPopulate = {
  blocks: {
    on: blockPopulateByComponent,
  },
} as const;

export function buildLayoutQuery(params: {
  slug: string;
  status: "draft" | "published";
  locale?: string;
}) {
  return qs.stringify(
    {
      filters: { slug: { $eq: params.slug } },
      status: params.status,
      locale: params.locale,
      fields: ["title", "slug"],
      populate: pageLayoutPopulate,
    },
    { encodeValuesOnly: true }
  );
}

export function buildBlockQuery(params: {
  slug: string;
  status: "draft" | "published";
  component: BlockComponentUid;
  locale?: string;
}) {
  return qs.stringify(
    {
      filters: { slug: { $eq: params.slug } },
      status: params.status,
      locale: params.locale,
      populate: {
        blocks: {
          on: {
            [params.component]: blockPopulateByComponent[params.component],
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );
}

export function buildPageQuery(params: {
  slug: string;
  status: "draft" | "published";
  locale?: string;
}) {
  return qs.stringify(
    {
      filters: { slug: { $eq: params.slug } },
      status: params.status,
      locale: params.locale,
      populate: pageBlocksPopulate,
    },
    { encodeValuesOnly: true }
  );
}
