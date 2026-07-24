<script lang="ts">
  import { baseUrl, siteDescription, siteName, username } from "$lib/constants";

  let {
    description,
    slug,
    title,
  }: { description?: string; slug?: string; title?: string } = $props();

  const pageTitle = $derived(title ? `${title} • ${siteName}` : siteName);
  const pageDescription = $derived(description ?? siteDescription);
  const canonical = $derived(slug ? `${baseUrl}/${slug}` : baseUrl);
  const ogImage = $derived(
    title
      ? `${baseUrl}/api/og-image?title=${encodeURIComponent(title)}`
      : `${baseUrl}/api/og-image`,
  );
  const rootOgImage = `${baseUrl}/api/og-image`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta content={pageDescription} name="description" />
  <link href={canonical} rel="canonical" />
  <meta content={pageTitle} property="og:title" />
  <meta content={pageDescription} property="og:description" />
  {#if !title}
    <meta content={canonical} property="og:url" />
    <meta content={siteName} property="og:site_name" />
    <meta content="en_US" property="og:locale" />
  {/if}
  <meta content={ogImage} property="og:image" />
  {#if !title}
    <meta content="website" property="og:type" />
  {/if}
  <meta content="summary_large_image" name="twitter:card" />
  <meta content={`@${username}`} name="twitter:site" />
  <meta content="14803093" name="twitter:site:id" />
  <meta content={`@${username}`} name="twitter:creator" />
  <meta content="14803093" name="twitter:creator:id" />
  <meta content={siteName} name="twitter:title" />
  <meta content={siteDescription} name="twitter:description" />
  <meta content={rootOgImage} name="twitter:image" />
</svelte:head>
