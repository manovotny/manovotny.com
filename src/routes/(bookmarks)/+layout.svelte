<script lang="ts">
  import { ClerkProvider, SignIn } from "svelte-clerk";
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";

  let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<ClerkProvider>
  {#if data.signedIn}
    {@render children()}
  {:else}
    <div class="mt-18 flex justify-center">
      <SignIn fallbackRedirectUrl="/bookmarks" routing="hash" />
    </div>
  {/if}
</ClerkProvider>
