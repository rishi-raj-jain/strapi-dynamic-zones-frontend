import { BlockSkeleton } from "./BlockSkeleton";

/** Shown instantly while the layout API resolves — before per-block fetches start. */
export function PageLayoutSkeleton() {
  return (
    <div className="flex flex-col" aria-busy="true" aria-label="Loading page">
      <BlockSkeleton variant="hero.hero" />
      <BlockSkeleton variant="rich-text.rich-text" />
      <BlockSkeleton variant="feature-grid.feature-grid" />
    </div>
  );
}
