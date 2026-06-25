export function getStrapiMediaUrl(path: string) {
  const base = (process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337").replace(
    /"/g,
    ""
  );
  if (path.startsWith("http")) return path;
  return `${base}${path}`;
}
