<!--
  iOS Safari zooms the page when a focused input is under 16px. Render at
  16px, scale every dimension by 16/14, then scale(0.875) back so it sits at
  a visual 14px and 36px tall, matching the buttons beside it. Borrowed from
  Windfall's SearchInput.
  https://thingsthemselves.com/no-input-zoom-in-safari-on-iphone-the-pixel-perfect-way/
-->
<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  import { cn } from "$lib/classname";

  let {
    class: className,
    value = $bindable(),
    ...rest
  }: HTMLInputAttributes = $props();
</script>

<div class={cn("relative", className)}>
  <input
    bind:value
    class="border-hairline bg-bg focus:border-ink mr-[-14.285714%] mb-[-5.142857px] h-[41.142857px] w-[114.285714%] origin-top-left scale-[0.875] rounded-[6.857143px] border-[1.142857px] px-[13.714286px] text-[16px] outline-none"
    {...rest}
  />
</div>

<style>
  /* The site's global :focus-visible ring is un-layered, so Tailwind's
     outline utilities can't override it. The ink border is the focus cue. */
  input:focus-visible {
    outline: none;
  }
</style>
