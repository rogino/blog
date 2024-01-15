<script lang="ts">
  import { SITE } from "./src/config";

  export let source: { src: string, type: string }[];
  export let description: string;
  export let aspectRatio: number = 1.0;

  export let poster: string|undefined;
  /// Value prepended to poster and source URLs
  export let baseUrl: string = "";

  export let autoplay: boolean = true;
  export let controls: boolean = true;
  export let muted: boolean = true;
  export let loop: boolean = false;
  export let playsinline: boolean=true;

  let properties = {
    autoplay,
    controls,
    muted,
    loop,
    playsinline,
    poster: typeof poster == "string" ? baseUrl + poster : poster
  };

  // https://jakearchibald.com/2022/html-codecs-parameter-for-av1/
  // https://dmnsgn.github.io/media-codecs
  // ffprobe -show_streams h265.10.mp4 | grep -e "codec_name" -e "level" -e "profile"
  // No idea how to determine compatibility level for h265
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
    {...properties}
  >
    {#each source as track}
      <source src={baseUrl + track.src} type={track.type}/>
    {/each}
  </video>
  <figcaption>
    {description}
  </figcaption>
</figure>
