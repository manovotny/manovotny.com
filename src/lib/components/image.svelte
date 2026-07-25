<script lang="ts">
  import { vercelImage, vercelImageSrcset } from "$lib/image";

  let {
    alt,
    caption,
    height,
    sizes = "(min-width: 656px) 608px, calc(100vw - 3rem)",
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
  <div class="border-hairline bg-hover rounded-lg border p-2">
    <img
      {alt}
      class="border-hairline rounded-md border"
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
    <figcaption class="text-secondary pt-4 text-center text-sm">
      {caption}
    </figcaption>
  {/if}
</figure>
