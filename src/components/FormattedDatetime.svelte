<script lang="ts">
  import { LOCALE } from "@config";

  export let pubDatetime: string | Date;
  export let modDatetime: string | Date | undefined | null;
  export let includeTime: Bool = true;

  let myDatetime = new Date(modDatetime ? modDatetime : pubDatetime);

  const date = myDatetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = myDatetime.toLocaleTimeString(LOCALE.langTag, {
    hour: "2-digit",
    minute: "2-digit",
  });
</script>

<time datetime={myDatetime.toISOString()}>{date}</time>
{#if includeTime}
  <span aria-hidden="true"> | </span>
  <span class="sr-only">&nbsp;at&nbsp;</span>
  <span class="text-nowrap">{time}</span>
{/if}
