import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/utils";
import type { StrapiMedia } from "@/lib/strapi/types";

type Props = {
  media: StrapiMedia;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

export function StrapiImage({
  media,
  className,
  priority,
  sizes,
  fill = false,
}: Props) {
  const src = getStrapiMediaUrl(media.url);

  if (fill) {
    return (
      <Image
        src={src}
        alt={media.alternativeText ?? ""}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  const width = media.width ?? 1200;
  const height = media.height ?? 800;

  return (
    <Image
      src={src}
      alt={media.alternativeText ?? ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
