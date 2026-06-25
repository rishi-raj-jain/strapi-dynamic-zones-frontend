import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const slug = body?.entry?.slug as string | undefined;

  revalidateTag("strapi-pages", "max");
  if (slug) revalidateTag(`page:${slug}`, "max");

  return NextResponse.json({ revalidated: true, slug });
}
