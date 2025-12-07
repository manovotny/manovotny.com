import { default as NextImage } from "next/image";
import type { ImageProps as NextImageProps } from "next/image";

type ImageProps = {
  caption?: string;
} & NextImageProps;

export function Image(props: ImageProps) {
  return (
    <figure className="mb-6">
      <div className="rounded-lg border border-neutral-200 bg-white p-2 shadow-xs dark:border-neutral-700 dark:bg-neutral-800">
        <NextImage
          className="rounded-md border border-neutral-200"
          sizes="(min-width: 1024px) 768px, 100vw"
          {...props}
        />
      </div>
      {props?.caption && props?.caption.length > 0 && (
        <figcaption className="pt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {props.caption}
        </figcaption>
      )}
    </figure>
  );
}
