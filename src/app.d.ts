/// <reference types="svelte-clerk/env" />

declare global {
  namespace App {}
}

declare module "*.ttf" {
  const src: string;
  export default src;
}

export {};
