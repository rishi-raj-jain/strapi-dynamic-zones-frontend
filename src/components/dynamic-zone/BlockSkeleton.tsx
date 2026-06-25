import type { BlockComponentUid } from "@/lib/strapi/types";

export type BlockSkeletonVariant = BlockComponentUid | "video" | "map";

export function BlockSkeleton({ variant }: { variant: BlockSkeletonVariant }) {
  if (variant === "hero.hero") {
    return (
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 text-center sm:px-8 lg:px-12">
          <div className="mx-auto h-5 w-48 animate-pulse rounded bg-neutral-200" />
          <div className="mx-auto mt-4 h-12 w-full max-w-3xl animate-pulse rounded-lg bg-neutral-200" />
          <div className="mx-auto mt-8 h-10 w-32 animate-pulse rounded-full bg-neutral-200" />
          <div className="mx-auto mt-12 aspect-[16/9] w-full max-w-5xl animate-pulse rounded-2xl bg-neutral-100" />
        </div>
      </section>
    );
  }

  if (variant === "rich-text.rich-text") {
    return (
      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl space-y-4 px-6">
          <div className="mx-auto h-8 w-2/3 animate-pulse rounded bg-neutral-200" />
          <div className="mx-auto h-4 w-full animate-pulse rounded bg-neutral-100" />
          <div className="mx-auto h-4 w-5/6 animate-pulse rounded bg-neutral-100" />
        </div>
      </section>
    );
  }

  if (variant === "feature-grid.feature-grid") {
    return (
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-neutral-200" />
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-100" />
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-100" />
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-100" />
          </div>
        </div>
      </section>
    );
  }

  if (variant === "video") {
    return (
      <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral-200" />
    );
  }

  if (variant === "map") {
    return (
      <div className="h-96 w-full animate-pulse rounded-xl bg-neutral-200" />
    );
  }

  return (
    <div className="h-32 w-full animate-pulse rounded-xl bg-neutral-100" />
  );
}
