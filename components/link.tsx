import { default as NextLink } from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/classname";

export function Link({
  href,
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const classNames = cn(
    "text-blue-500 underline-offset-3 hover:text-blue-500 hover:underline dark:text-blue-400",
    className,
  );

  if (href?.startsWith("/")) {
    return (
      <NextLink className={classNames} href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  if (href?.startsWith("#")) {
    return (
      <a className={classNames} href={href} {...props}>
        {children}
      </a>
    );
  }

  const isAffiliateLink =
    href?.includes("amzn.to") ||
    href?.includes("join.robinhood.com") ||
    href?.includes("share_your_love=manovotny");

  return (
    <a
      className={classNames}
      href={href}
      rel={cn("noopener noreferrer nofollow", {
        sponsored: isAffiliateLink,
      })}
      {...props}
    >
      {children}
    </a>
  );
}
