import { buildBlockQuery, buildLayoutQuery, buildPageQuery } from "./populate";
import type {
  BlockComponentUid,
  DynamicZoneBlock,
  Page,
  PageLayout,
} from "./types";

const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
).replace(/"/g, "");

/** Demo delay — remove when done testing streaming. */
const FETCH_DELAY_MS = 1000;

async function fetchWithDelay(url: string, init: RequestInit) {
  const [res] = await Promise.all([
    fetch(url, init),
    new Promise((resolve) => setTimeout(resolve, FETCH_DELAY_MS)),
  ]);
  return res;
}

type FetchOptions = {
  slug: string;
  status: "draft" | "published";
  locale?: string;
  cache?: RequestCache;
  tags?: string[];
};

function strapiHeaders() {
  return {
    "Content-Type": "application/json",
    ...(process.env.STRAPI_API_TOKEN && {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    }),
  };
}

/** Fetches page layout only — block ids and component types, no block content. */
export async function fetchPageLayoutBySlug({
  slug,
  status,
  locale,
  cache = "force-cache",
  tags = ["strapi-pages"],
}: FetchOptions): Promise<PageLayout | null> {
  const query = buildLayoutQuery({ slug, status, locale });
  const url = `${STRAPI_URL}/api/pages?${query}`;

  const res = await fetchWithDelay(url, {
    headers: strapiHeaders(),
    cache,
    next: { tags: [...tags, `page:${slug}`] },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return (json.data?.[0] as PageLayout | undefined) ?? null;
}

/** Each block calls Strapi independently with population tuned to that component. */
export async function fetchBlockById<C extends BlockComponentUid>({
  slug,
  blockId,
  component,
  status,
  locale,
  cache = "force-cache",
}: {
  slug: string;
  blockId: number;
  component: C;
  status: "draft" | "published";
  locale?: string;
  cache?: RequestCache;
}): Promise<Extract<DynamicZoneBlock, { __component: C }> | null> {
  const query = buildBlockQuery({ slug, status, component, locale });
  const url = `${STRAPI_URL}/api/pages?${query}`;

  const res = await fetchWithDelay(url, {
    headers: strapiHeaders(),
    cache,
    next: { tags: [`block:${slug}:${blockId}`, `page:${slug}`] },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const page = json.data?.[0] as Page | undefined;
  const block = page?.blocks?.find(
    (entry): entry is Extract<DynamicZoneBlock, { __component: C }> =>
      entry.id === blockId && entry.__component === component
  );

  return block ?? null;
}

/** Full page fetch — kept for webhooks, previews, or non-streaming use. */
export async function fetchPageBySlug({
  slug,
  status,
  locale,
  cache = "force-cache",
  tags = ["strapi-pages"],
}: FetchOptions): Promise<Page | null> {
  const query = buildPageQuery({ slug, status, locale });
  const url = `${STRAPI_URL}/api/pages?${query}`;

  const res = await fetch(url, {
    headers: strapiHeaders(),
    cache,
    next: { tags },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return (json.data?.[0] as Page | undefined) ?? null;
}
