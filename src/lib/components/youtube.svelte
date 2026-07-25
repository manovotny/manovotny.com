<script lang="ts">
  let { caption, id, title }: { caption?: string; id: string; title: string } =
    $props();
</script>

<figure class="mb-6">
  <div class="border-hairline bg-hover rounded-lg border p-2">
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="border-hairline aspect-video w-full rounded-md border"
      loading="lazy"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      {title}
    ></iframe>
  </div>
  {#if caption && caption.length > 0}
    <figcaption class="text-secondary pt-4 text-center text-sm">
      {caption}
    </figcaption>
  {/if}
</figure>
