import { dev } from "$app/environment";

const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const QUALITY = 75;

export function vercelImage(src: string, width: number): string {
  if (dev) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${QUALITY}`;
}

export function vercelImageSrcset(src: string): string {
  if (dev) return "";
  return WIDTHS.map((w) => `${vercelImage(src, w)} ${w}w`).join(", ");
}
