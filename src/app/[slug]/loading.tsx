import { PageLayoutSkeleton } from "@/components/dynamic-zone/PageLayoutSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <PageLayoutSkeleton />
    </main>
  );
}
