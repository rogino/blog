import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://rioogino.com",
  author: "Rio Ogino",
  desc: "A blog by Rio Ogino covering iOS development and unrelated topics",
  title: "Rio Ogino",
  ogImage: "og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 40 * (90 / 65),
  height: 40,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Mastodon",
    href: "https://mastodon.social/@rioog",
    linkTitle: `${SITE.title} on Mastodon`,
    active: true,
  },
  {
    name: "Github",
    href: "https://github.com/rogino",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
];
