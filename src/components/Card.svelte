<script lang="ts">
  import { slugifyStr } from "@utils/slugify";
  import Datetime from "./Datetime.svelte";
  import type { CollectionEntry } from "astro:content";
  import type { HTMLAttributes } from "astro/types";

  export let href: string;
  export let frontmatter: CollectionEntry<"blog">["data"];
  export let secHeading: boolean|undefined = true;

  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: `viewTransitionName: ${slugifyStr(title)}`,
    class: "text-lg font-medium decoration-dashed hover:underline",
  };
</script>
<li class="my-6">
  <a
    href={href}
    class="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
  >
    {#if secHeading}
      <h2 {...headerProps}>{title}</h2>
    {:else}
      <h3 {...headerProps}>{title}</h3>
    {/if}
  </a>
  <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
  <p>{description}</p>
</li>
