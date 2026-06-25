import { Suspense } from "react";
import { blockRegistry } from "@/blocks/registry";
import { BlockSkeleton } from "./BlockSkeleton";
import type { BlockLayout } from "@/lib/strapi/types";

type BlockSlotProps = {
  block: BlockLayout;
  slug: string;
  status: "draft" | "published";
};

/** Async shell so Suspense can stream each block independently. */
async function BlockSlot({ block, slug, status }: BlockSlotProps) {
  const shell = { ...block, slug, status };

  switch (block.__component) {
    case "hero.hero": {
      const Hero = blockRegistry["hero.hero"];
      return <Hero {...shell} __component="hero.hero" />;
    }
    case "rich-text.rich-text": {
      const RichText = blockRegistry["rich-text.rich-text"];
      return <RichText {...shell} __component="rich-text.rich-text" />;
    }
    case "feature-grid.feature-grid": {
      const FeatureGrid = blockRegistry["feature-grid.feature-grid"];
      return <FeatureGrid {...shell} __component="feature-grid.feature-grid" />;
    }
  }
}

export function DynamicZoneRenderer({
  blocks,
  slug,
  status,
}: {
  blocks: BlockLayout[] | null | undefined;
  slug: string;
  status: "draft" | "published";
}) {
  if (!blocks?.length) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const key = `${block.__component}-${block.id ?? index}`;

        return (
          <Suspense key={key} fallback={<BlockSkeleton variant={block.__component} />}>
            <BlockSlot block={block} slug={slug} status={status} />
          </Suspense>
        );
      })}
    </div>
  );
}
