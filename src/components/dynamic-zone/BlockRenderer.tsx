import { blockRegistry, isKnownBlock } from "@/blocks/registry";
import type { BlockLayout } from "@/lib/strapi/types";

function UnknownBlockDev({ component }: { component: string }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div className="my-4 rounded border border-dashed border-red-400 p-4 font-mono text-sm">
      Unknown block: <code>{component}</code>
    </div>
  );
}

type BlockRendererProps = {
  block: BlockLayout;
  slug: string;
  status: "draft" | "published";
};

export function BlockRenderer({ block, slug, status }: BlockRendererProps) {
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

export function SafeBlockRenderer({
  block,
  slug,
  status,
}: {
  block: { __component: string; id?: number };
  slug: string;
  status: "draft" | "published";
}) {
  if (!isKnownBlock(block)) {
    return <UnknownBlockDev component={block.__component} />;
  }
  return <BlockRenderer block={block} slug={slug} status={status} />;
}
