import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImages";
import sharp from "sharp";

export async function getStaticPaths() {
  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  let png = await generateOgImageForPost(props as CollectionEntry<"blog">);
  let jpeg = await sharp(png).jpeg({ mozjpeg: true, quality: 85 }).toBuffer();
  return new Response(jpeg, {
    headers: { "Content-Type": "image/jpeg" },
  });
};
