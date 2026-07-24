<script lang="ts">
  import { vercelImage, vercelImageSrcset } from "$lib/image";

  let {
    alt,
    caption,
    height,
    sizes = "(min-width: 1024px) 768px, 100vw",
    src,
    width,
  }: {
    alt: string;
    caption?: string;
    height: number;
    sizes?: string;
    src: string;
    width: number;
  } = $props();
</script>

<figure class="mb-6">
  <div
    class="rounded-lg border border-neutral-200 bg-white p-2 shadow-xs dark:border-neutral-700 dark:bg-neutral-800"
  >
    <img
      {alt}
      class="rounded-md border border-neutral-200"
      decoding="async"
      {height}
      loading="lazy"
      {sizes}
      src={vercelImage(src, 3840)}
      srcset={vercelImageSrcset(src) || undefined}
      style="color: transparent;"
      {width}
    />
  </div>
  {#if caption && caption.length > 0}
    <figcaption
      class="pt-4 text-center text-sm text-neutral-500 dark:text-neutral-400"
    >
      {caption}
    </figcaption>
  {/if}
</figure>
