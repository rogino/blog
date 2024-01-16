import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";
import { readFileSync } from "fs";
import path from "path";

const imageSrc64 = (src: string, format: string): string => {
  // dev: @/fs/absolute/path/to/file
  // og: relative path, base path being $process/dist/ (not sure how to get 'dist')
  let mime = format + (format == "svg" ? "+xml" : "");
  return `data:image/${mime};base64,${readFileSync(
    path.join(process.cwd(), src)
  ).toString("base64")}`;
};

// Must also be used in at least one page

const logoSrc = imageSrc64("og-assets/RO.squircle.svg", "svg");
const backgroundSrc = imageSrc64("og-assets/og.post.logoless.png", "png");

export default ({ post }: { post: CollectionEntry<"blog"> }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={backgroundSrc}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          objectFit: "cover",
          objectPosition: "bottom",
        }}
      />
      <div
        style={{
          width: "85%",
          height: "80%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: 72,
            maxHeight: "84%",
            overflow: "hidden",
            margin: 0,
          }}
        >
          {post.data.title}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "8px",
            fontSize: 28,
          }}
        >
          <img
            src={logoSrc}
            style={{
              width: "100px",
              height: "100px",
              transform: "rotate(-15deg)",
              /* filter: "drop-shadow(5px 10px 5px #597d8f)", */
            }}
          />
          <span style={{ overflow: "hidden", fontWeight: "600" }}>
            {SITE.title}
          </span>
        </div>
      </div>
    </div>
  );
};
