import { StrapiImage } from "@/components/StrapiImage";
import { fetchBlockById } from "@/lib/strapi/client";
import {
  getFeatureGridClassName,
  normalizeFeatureItems,
} from "@/lib/feature-grid";
import { sectionClassName } from "@/lib/ui";
import type {
  BlockShellProps,
  FeatureGridBlock as FeatureGridBlockData,
} from "@/lib/strapi/types";

export async function FeatureGridBlock({
  id,
  slug,
  status,
}: BlockShellProps & { __component: "feature-grid.feature-grid" }) {
  const data = await fetchBlockById({
    slug,
    blockId: id,
    component: "feature-grid.feature-grid",
    status,
  });

  if (!data) return null;

  return <FeatureGridBlockView {...data} />;
}

function FeatureGridBlockView({ title, feature }: FeatureGridBlockData) {
  const items = normalizeFeatureItems(feature);

  if (!title && items.length === 0) return null;

  const gridClassName = getFeatureGridClassName(items.length);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={sectionClassName}>
        {title ? (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              {title}
            </h2>
          </div>
        ) : null}

        {items.length > 0 ? (
          <ul
            className={`grid gap-10 sm:gap-12 lg:gap-16 ${gridClassName} ${title ? "mt-12 lg:mt-16" : ""}`}
          >
            {items.map((featureItem) => (
              <li key={featureItem.id} className="text-center lg:text-left">
                {featureItem.image ? (
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface">
                    <StrapiImage
                      media={featureItem.image}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-brand lg:mx-0" />
                )}
                {featureItem.heading ? (
                  <h3 className="text-lg font-semibold text-zinc-950 sm:text-xl">
                    {featureItem.heading}
                  </h3>
                ) : null}
                {featureItem.subtext ? (
                  <p
                    className={`mx-auto max-w-sm whitespace-pre-wrap text-base leading-relaxed text-muted lg:mx-0 ${featureItem.heading ? "mt-3" : ""}`}
                  >
                    {featureItem.subtext}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
