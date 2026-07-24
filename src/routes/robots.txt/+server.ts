import { baseUrl } from "$lib/constants";

export const prerender = true;

export const GET = () => {
  const body = `User-Agent: *
Disallow: /api/

Host: ${baseUrl}
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: { "content-type": "text/plain" },
  });
};
