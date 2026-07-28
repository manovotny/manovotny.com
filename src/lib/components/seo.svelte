<script lang="ts">
  import { baseUrl, siteDescription, siteName, username } from "$lib/constants";

  let {
    description,
    slug,
    title,
    type,
  }: {
    description?: string;
    slug?: string;
    title?: string;
    type?: "article" | "website";
  } = $props();

  const pageTitle = $derived(title ? `${title} • ${siteName}` : siteName);
  const pageDescription = $derived(description ?? siteDescription);
  const canonical = $derived(slug ? `${baseUrl}/${slug}` : baseUrl);
  const ogImage = $derived(
    title
      ? `${baseUrl}/api/og-image?title=${encodeURIComponent(title)}`
      : `${baseUrl}/api/og-image`,
  );
  const ogType = $derived(type ?? (title ? "article" : "website"));
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta content={pageDescription} name="description" />
  <link href={canonical} rel="canonical" />
  <meta content={pageTitle} property="og:title" />
  <meta content={pageDescription} property="og:description" />
  <meta content={canonical} property="og:url" />
  <meta content={siteName} property="og:site_name" />
  <meta content="en_US" property="og:locale" />
  <meta content={ogImage} property="og:image" />
  <meta content={ogType} property="og:type" />
  <meta content="summary_large_image" name="twitter:card" />
  <meta content={`@${username}`} name="twitter:site" />
  <meta content="14803093" name="twitter:site:id" />
  <meta content={`@${username}`} name="twitter:creator" />
  <meta content="14803093" name="twitter:creator:id" />
  <meta content={pageTitle} name="twitter:title" />
  <meta content={pageDescription} name="twitter:description" />
  <meta content={ogImage} name="twitter:image" />
</svelte:head>
