import React, { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";
import type { MDXComponents } from "mdx/types";
import { Code } from "bright";

Code.theme = {
  dark: "github-dark",
  light: "github-light",
  lightSelector: "body.scheme-light",
  darkSelector: "body.scheme-dark",
};
Code.className =
  "text-sm border border-neutral-200 dark:border-neutral-700 shadow-xs";
Code.lineNumbers = true;

const components: MDXComponents = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const className =
      "text-blue-500 dark:text-blue-400 underline-offset-3 hover:underline";

    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }

    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    return (
      <code
        className="text-sm rounded-md border border-neutral-200 bg-white px-[4px] py-[5px] break-words whitespace-pre-wrap shadow-xs dark:border-neutral-700 dark:bg-neutral-800"
        {...props}
      >
        {children}
      </code>
    );
  },
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="fade-in mb-0 pt-12 text-lg font-medium text-balance"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-8 mb-3 font-medium text-balance text-neutral-800"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 mb-3 font-medium text-balance text-neutral-800"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="font-medium text-balance" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className="h-px mx-auto w-11/12 border-neutral-200 dark:border-neutral-700"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="space-y-2 pl-5 list-decimal text-neutral-800" {...props} />
  ),
  pre: Code,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="space-y-1 pl-5 list-disc text-neutral-800" {...props} />
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
