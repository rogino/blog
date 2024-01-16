import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import { readFileSync } from "fs";

const fontPathRegular = "og-assets/font/OpenSans-Regular.ttf";
const fontPathBold = "og-assets/font/OpenSans-SemiBold.ttf";

import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "Open Sans",
      data: readFileSync(fontPathRegular),
      style: "normal",
      weight: 400,
    },
    {
      name: "Open Sans",
      data: readFileSync(fontPathBold),
      style: "normal",
      weight: 600,
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage({ post }), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
