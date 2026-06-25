export function isRichTextHtml(content: string) {
  return /<[a-z][\s\S]*>/i.test(content);
}

export const richTextProseClassName =
  "prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:font-medium prose-a:text-zinc-900 prose-a:underline-offset-4 hover:prose-a:text-zinc-700 dark:prose-a:text-zinc-100 dark:hover:prose-a:text-white prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-900 dark:prose-code:bg-zinc-900 dark:prose-code:text-zinc-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-950 prose-pre:text-zinc-100 dark:prose-pre:border-zinc-800 prose-img:rounded-xl prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800";
