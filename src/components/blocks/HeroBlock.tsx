import Link from "next/link";
import { StrapiImage } from "@/components/StrapiImage";
import { fetchBlockById } from "@/lib/strapi/client";
import { ctaClassName, sectionClassName } from "@/lib/ui";
import type {
  BlockShellProps,
  HeroBlock as HeroBlockData,
} from "@/lib/strapi/types";

export async function HeroBlock({
  id,
  slug,
  status,
}: BlockShellProps & { __component: "hero.hero" }) {
  const data = await fetchBlockById({
    slug,
    blockId: id,
    component: "hero.hero",
    status,
  });

  if (!data) return null;

  return <HeroBlockView {...data} />;
}

function HeroBlockView({
  heading,
  subheading,
  ctaLabel,
  ctaUrl,
  image,
}: HeroBlockData) {
  if (!heading && !subheading && !image) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className={`${sectionClassName} text-center`}>
        {subheading ? (
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-muted sm:text-lg">
            {subheading}
          </p>
        ) : null}
        {heading ? (
          <h2
            className={`mx-auto max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl ${subheading ? "mt-4" : ""}`}
          >
            {heading}
          </h2>
        ) : null}
        {ctaLabel && ctaUrl ? (
          <div className={heading || subheading ? "mt-8" : ""}>
            <Link href={ctaUrl} className={ctaClassName}>
              {ctaLabel}
            </Link>
          </div>
        ) : null}
        {image ? (
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface">
            <StrapiImage
              media={image}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
