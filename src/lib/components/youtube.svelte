<script lang="ts">
  let { caption, id, title }: { caption?: string; id: string; title: string } =
    $props();
</script>

<figure class="mb-6">
  <div
    class="rounded-lg border border-neutral-200 bg-white p-2 shadow-xs dark:border-neutral-700 dark:bg-neutral-800"
  >
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="aspect-video w-full rounded-md border border-neutral-200"
      loading="lazy"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      {title}
    ></iframe>
  </div>
  {#if caption && caption.length > 0}
    <figcaption
      class="pt-4 text-center text-sm text-neutral-500 dark:text-neutral-400"
    >
      {caption}
    </figcaption>
  {/if}
</figure>
