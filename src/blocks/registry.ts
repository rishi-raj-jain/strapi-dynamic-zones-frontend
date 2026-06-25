import type { ComponentType } from "react";
import type { BlockComponentUid, BlockLayout, BlockShellProps } from "@/lib/strapi/types";

import { HeroBlock } from "@/components/blocks/HeroBlock";
import { RichTextBlock } from "@/components/blocks/RichTextBlock";
import { FeatureGridBlock } from "@/components/blocks/FeatureGridBlock";

type BlockRegistry = {
  [K in BlockComponentUid]: ComponentType<
    BlockShellProps & { __component: K }
  >;
};

export const blockRegistry: BlockRegistry = {
  "hero.hero": HeroBlock,
  "rich-text.rich-text": RichTextBlock,
  "feature-grid.feature-grid": FeatureGridBlock,
};

const knownComponents = new Set<string>(Object.keys(blockRegistry));

export function isKnownBlock(
  block: { __component: string }
): block is BlockLayout {
  return knownComponents.has(block.__component);
}
