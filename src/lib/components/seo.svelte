<script lang="ts">
  import { baseUrl, siteDescription, siteName, username } from "$lib/constants";

  let {
    date,
    description,
    slug,
    title,
  }: {
    date?: string;
    description?: string;
    slug?: string;
    title?: string;
  } = $props();

  const pageTitle = $derived(title ? `${title} • ${siteName}` : siteName);
  const pageDescription = $derived(description ?? siteDescription);
  const canonical = $derived(slug ? `${baseUrl}/${slug}` : baseUrl);
  const ogImage = $derived(
    title
      ? `${baseUrl}/api/og-image?title=${encodeURIComponent(title)}`
      : `${baseUrl}/api/og-image`,
  );
  // Only notes carry a date, so it separates an article from a listing page
  // like /notes or /uses — both have a title but neither is an article.
  const ogType = $derived(date ? "article" : "website");
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
