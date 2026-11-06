import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

/* Map MDX tags to branded elements so prose matches the rest of the site. */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold text-foreground" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 leading-relaxed text-muted" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 flex flex-col gap-2 pl-5 [&>li]:list-disc [&>li]:marker:text-accent" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 flex flex-col gap-2 pl-5 [&>li]:list-decimal [&>li]:marker:text-accent" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed text-muted" {...props} />
  ),
  a: ({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) => {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline underline-offset-4 hover:no-underline"
          {...rest}
        />
      );
    }
    const { ref: _ref, ...linkRest } = rest as ComponentPropsWithoutRef<"a"> & {
      ref?: unknown;
    };
    return (
      <Link
        href={href}
        className="text-accent underline underline-offset-4 hover:no-underline"
      >
        {linkRest.children}
      </Link>
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-accent bg-surface-2 py-3 pl-4 pr-4 italic text-foreground"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-[var(--radius-card)] border border-border bg-surface-2 p-4 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) =>
    typeof src === "string" && src ? (
      <span className="relative my-6 block overflow-hidden rounded-[var(--radius-card)] border border-border">
        {/* Use next/image so MDX images still get the pipeline. */}
        <Image
          src={src}
          alt={alt ?? ""}
          width={1200}
          height={675}
          className="h-auto w-full"
        />
      </span>
    ) : null,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-surface-2 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left"
        {...props}
      />
    </div>
  ),
};
