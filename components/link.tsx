import { ComponentPropsWithoutRef } from "react";
import { default as NextLink } from "next/link";
import { cn } from "@/lib/classname";

export function Link({
  href,
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const classNames = cn(
    "text-blue-500 hover:text-blue-500 dark:text-blue-400 underline-offset-3 hover:underline",
    className,
  );

  if (href?.startsWith("/")) {
    return (
      <NextLink href={href} className={classNames} {...props}>
        {children}
      </NextLink>
    );
  }

  if (href?.startsWith("#")) {
    return (
      <a href={href} className={classNames} {...props}>
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
      href={href}
      rel={cn("noopener noreferrer nofollow", {
        sponsored: isAffiliateLink,
      })}
      className={classNames}
      {...props}
    >
      {children}
    </a>
  );
}
