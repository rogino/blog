<script context="module" lang="ts">
  export type SearchItem = {
    title: string;
    description: string;
    data: CollectionEntry<"blog">["data"];
    slug: string;
  };
</script>
<script lang="ts">
  import Fuse from "fuse.js";
  import Card from "@components/Card.svelte";
  import type { CollectionEntry } from "astro:content";
  import { onMount } from "svelte";

  interface SearchResult {
    item: SearchItem;
    refIndex: number;
  }

  export let searchList: SearchItem[];

  let inputRef: HTMLInputElement;

  let inputVal: string = "";
  let searchResults: SearchResult[] | null;


  const fuse = new Fuse(searchList, {
    keys: ["title", "description"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  });

  const updateSearch = (query: string|null = null) => {
    if (query == null) query = inputVal;
    searchResults = query.length > 1 ? fuse.search(query) : null;
    if (typeof window !== "undefined") updateURL();
  };

  const updateURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (inputVal.length > 0) {
      searchParams.set("q", inputVal);
      window.history.replaceState({}, "", `?${searchParams}`);
    } else {
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  onMount(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) {
      inputVal = searchStr;
      updateSearch();
    }

    setTimeout(() => {
      if (inputRef) {
        inputRef.selectionStart = inputRef.selectionEnd = searchStr?.length || 0;
      }
    }, 50);
  });

  $: updateSearch(inputVal);
</script>
<label class="relative block">
  <span class="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
    </svg>
    <span class="sr-only">Search</span>
  </span>
  <input
    class="block w-full rounded border border-skin-fill 
  border-opacity-40 bg-skin-fill py-3 pl-10
  pr-3 placeholder:italic placeholder:text-opacity-75 
  focus:border-skin-accent focus:outline-none"
    placeholder="Search for anything..."
    type="text"
    name="search"
    bind:value={inputVal}
    autoComplete="off"
    bind:this={inputRef}
  />
</label>

{#if inputVal.length > 1}
  {@const numResults = searchResults?.length ?? 0}
  <div class="mt-8">
    Found {numResults}
    {numResults === 1 ? " result" : " results"}{" "} for '{inputVal}'
  </div>
{/if}

<ul>
  {#if searchResults}
    {#each searchResults as { item, refIndex } (`${refIndex}-${item.slug}`)}
      <Card
        href={`/posts/${item.slug}`}
        frontmatter={item.data}
      />
    {/each}
  {/if}
</ul>

