import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { Link } from "@/components/link";

const components: MDXComponents = {
  a: Link,
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-md border border-neutral-200 bg-white px-[4px] py-[5px] font-mono text-sm break-words whitespace-pre-wrap shadow-xs dark:border-neutral-700 dark:bg-neutral-800"
      {...props}
    >
      {children}
    </code>
  ),
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mb-6 text-2xl font-bold text-balance" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="my-6 text-xl font-bold text-balance" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="my-6 text-lg font-bold text-balance" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="my-4 font-bold text-balance" {...props} />
  ),
  h5: (props: ComponentPropsWithoutRef<"h5">) => (
    <h5 className="my-4 font-bold text-balance" {...props} />
  ),
  h6: (props: ComponentPropsWithoutRef<"h6">) => (
    <h6 className="my-4 font-bold text-balance" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className="mx-auto mt-8 mb-10 h-px w-11/12 border-neutral-200 dark:border-neutral-700"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal space-y-2 pl-5" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 last:mb-0" {...props} />
  ),
  // `pre` is styled in `globals.css`
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc space-y-1 pl-5" {...props} />
  ),
};

export function useMDXComponents(
  otherComponents: MDXComponents,
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
  };
}
