<script lang="ts">
  export let source: { src: string, type: string }[]
  export let description: string;
  export let aspectRatio: number = 1.0;
</script>
<style>
  video {
    width: min(100%, calc(70vh * var(--aspect-ratio)));
    --aspect-ratio: 1.0;
    margin: 0;
  }
</style>
<figure {...$$restProps}>
  <video controls autoplay style="--aspect-ratio: {aspectRatio}">
    {#each source as track}
      <source {...track}/>
    {/each}
  </video>
  <figcaption>
    {description}
  </figcaption>
</figure>
