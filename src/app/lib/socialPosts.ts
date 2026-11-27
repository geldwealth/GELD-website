import { client } from "@/sanity/lib/client";
import { SOCIAL_POSTS_QUERY } from "@/sanity/lib/queries";

export type LatestSocialPost = {
  postUrl: string;
  embedUrl: string;
  caption: string;
  imageUrl?: string;
};

export type LatestSocial = {
  instagram: LatestSocialPost;
  linkedin: LatestSocialPost;
};

// Used when the "socialPosts" document in Sanity is missing or invalid.
const FALLBACK = {
  instagramUrl: "https://www.instagram.com/reel/DgK1annti7W/",
  instagramCaption: "Gold is a seat belt. Not an engine.",
  instagramImage:
    "https://cdn.sanity.io/images/rg4sn4ug/production/e5274ab75ae735987c5d572ba66b3d676bb14ab6-810x1438.jpg",
  linkedinUrl:
    "https://www.linkedin.com/feed/update/urn:li:activity:7528299837914640384/",
  linkedinCaption: "₹50 lakh salary. 15 years of investing. Still not sure if it is enough to retire.",
  linkedinImage:
    "https://cdn.sanity.io/images/rg4sn4ug/production/0a1f90ec67e0e44eb71fcc2b5126105b052d14b2-1080x1620.jpg",
};

export function instagramEmbed(url?: string): LatestSocialPost["embedUrl"] | null {
  const m = url?.match(/instagram\.com\/(?:[^/]+\/)?(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed/` : null;
}

export function linkedinEmbed(url?: string): string | null {
  const m = url?.match(/(?:activity|share|ugcPost)[:-](\d{15,})/);
  if (!m) return null;
  const kind = /ugcPost/.test(url!) ? "ugcPost" : /share[:-]\d/.test(url!) ? "share" : "activity";
  return `https://www.linkedin.com/embed/feed/update/urn:li:${kind}:${m[1]}`;
}

type Doc = {
  instagramUrl?: string;
  instagramCaption?: string;
  instagramImage?: string;
  linkedinUrl?: string;
  linkedinCaption?: string;
  linkedinImage?: string;
} | null;

const okImage = (u?: string) =>
  typeof u === "string" && /^https:\/\/cdn\.sanity\.io\//.test(u) ? u : undefined;

function build(url: string | undefined, caption: string | undefined, image: string | undefined, fbUrl: string, fbCaption: string, fbImage: string, embed: (u?: string) => string | null): LatestSocialPost {
  const e = embed(url);
  if (url && e && /^https:\/\//.test(url)) {
    return { postUrl: url, embedUrl: e, caption: caption?.trim() || fbCaption, imageUrl: okImage(image) };
  }
  return { postUrl: fbUrl, embedUrl: embed(fbUrl)!, caption: fbCaption, imageUrl: fbImage };
}

export async function getLatestSocial(): Promise<LatestSocial> {
  let d: Doc = null;
  try {
    d = await client.fetch<Doc>(SOCIAL_POSTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    d = null;
  }
  return {
    instagram: build(d?.instagramUrl, d?.instagramCaption, d?.instagramImage, FALLBACK.instagramUrl, FALLBACK.instagramCaption, FALLBACK.instagramImage, instagramEmbed),
    linkedin: build(d?.linkedinUrl, d?.linkedinCaption, d?.linkedinImage, FALLBACK.linkedinUrl, FALLBACK.linkedinCaption, FALLBACK.linkedinImage, linkedinEmbed),
  };
}
