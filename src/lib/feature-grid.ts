import type { FeatureItem } from "@/lib/strapi/types";

export function normalizeFeatureItems(
  features: FeatureItem[] | null | undefined
): FeatureItem[] {
  return (features ?? []).filter(
    (feature) =>
      feature.heading?.trim() || feature.subtext?.trim() || feature.image
  );
}

export function getFeatureGridClassName(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}
