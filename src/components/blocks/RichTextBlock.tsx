import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchBlockById } from "@/lib/strapi/client";
import { isRichTextHtml } from "@/lib/richtext";
import { sectionClassName } from "@/lib/ui";
import type {
  BlockShellProps,
  RichTextBlock as RichTextBlockData,
} from "@/lib/strapi/types";

const richTextProseClassName =
  "prose prose-zinc mx-auto max-w-4xl text-center prose-headings:mx-auto prose-headings:max-w-4xl prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:lg:text-5xl prose-h1:leading-tight prose-p:text-muted prose-p:text-lg prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline hover:prose-a:underline";

export async function RichTextBlock({
  id,
  slug,
  status,
}: BlockShellProps & { __component: "rich-text.rich-text" }) {
  const data = await fetchBlockById({
    slug,
    blockId: id,
    component: "rich-text.rich-text",
    status,
  });

  if (!data) return null;

  return <RichTextBlockView {...data} />;
}

function RichTextBlockView({ content }: RichTextBlockData) {
  if (!content) return null;

  const isHtml = isRichTextHtml(content);

  return (
    <section
      className="border-y border-border bg-surface py-16 sm:py-20"
      aria-label="Rich text"
    >
      <div className={sectionClassName}>
        {isHtml ? (
          <div
            className={richTextProseClassName}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className={richTextProseClassName}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </section>
  );
}
