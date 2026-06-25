import { Suspense } from "react";
import { draftMode } from "next/headers";
import { PageBlocks } from "@/components/dynamic-zone/PageBlocks";
import { PageLayoutSkeleton } from "@/components/dynamic-zone/PageLayoutSkeleton";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PageRoute({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  const status = isPreview ? "draft" : "published";

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<PageLayoutSkeleton />}>
        <PageBlocks
          slug={slug}
          status={status}
          cache={isPreview ? "no-store" : "force-cache"}
        />
      </Suspense>
    </main>
  );
}
