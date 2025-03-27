import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { MDXComponents } from "mdx/types";
import { Link } from "@/components/link";
import { highlight } from "sugar-high";

const components: MDXComponents = {
  a: Link,
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        className="rounded-md border border-neutral-200 bg-white px-[4px] py-[5px] font-[Geist_Mono] text-sm break-words whitespace-pre-wrap shadow-xs dark:border-neutral-700 dark:bg-neutral-800"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mb-6 text-2xl font-bold text-balance" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="my-6 text-xl font-bold text-balance" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="my-6 text-lg font-bold text-balance" {...props} />
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
    <ol className="list-decimal space-y-2 pl-5 text-neutral-800" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 last:mb-0" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      // className="shadow-xs"
      className="mb-6 overflow-x-scroll rounded-md border border-neutral-200 bg-white py-5 text-[13px] shadow-xs **:font-[Geist_Mono] dark:border-neutral-800 dark:bg-neutral-950"
      style={
        {
          "--sh-class":
            "light-dark(var(--color-purple-700), var(--color-purple-400))",
          "--sh-identifier": "", // objects
          "--sh-sign": "", // brackets, parentheses, curly braces, math symbols
          "--sh-property":
            "light-dark(var(--color-pink-700), var(--color-pink-500))",
          "--sh-entity":
            "light-dark(var(--color-green-700), var(--color-green-500))",
          "--sh-jsxliterals": "", // text in JSX
          "--sh-string":
            "light-dark(var(--color-green-700), var(--color-green-500))",
          "--sh-keyword":
            "light-dark(var(--color-pink-700), var(--color-pink-500))",
          "--sh-comment": "var(--color-gray-400)",
        } as CSSProperties
      }
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc space-y-1 pl-5 text-neutral-800" {...props} />
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
