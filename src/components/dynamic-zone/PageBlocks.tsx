import { notFound } from "next/navigation";
import { fetchPageLayoutBySlug } from "@/lib/strapi/client";
import { DynamicZoneRenderer } from "@/components/dynamic-zone/DynamicZoneRenderer";

type PageBlocksProps = {
  slug: string;
  status: "draft" | "published";
  cache: RequestCache;
};

export async function PageBlocks({ slug, status, cache }: PageBlocksProps) {
  const page = await fetchPageLayoutBySlug({
    slug,
    status,
    cache,
    tags: [`page:${slug}`],
  });

  if (!page) notFound();

  return (
    <>
      <h1 className="sr-only">{page.title ?? slug}</h1>
      <DynamicZoneRenderer blocks={page.blocks} slug={slug} status={status} />
    </>
  );
}
