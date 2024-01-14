<script lang="ts">
  export let source: { src: string, type: string }[]
  export let description: string;
  export let aspectRatio: number = 1.0;

  export let autoplay: boolean = true;
  export let controls: boolean = true;
  export let muted: boolean = true;
  export let loop: boolean = false;
</script>
<style>
  video {
    width: min(100%, calc(70vh * var(--aspect-ratio)));
    --aspect-ratio: 1.0;
    margin: 0;
  }
</style>
<figure {...$$restProps}>
  <video
    style="--aspect-ratio: {aspectRatio}"
    autoplay={autoplay}
    controls={controls}
    muted={muted}
    loop={loop}
  >
    {#each source as track}
      <source {...track}/>
    {/each}
  </video>
  <figcaption>
    {description}
  </figcaption>
</figure>
