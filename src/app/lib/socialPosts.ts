import { client } from "@/sanity/lib/client";
import { SOCIAL_POSTS_QUERY } from "@/sanity/lib/queries";

export type LatestSocialPost = {
  postUrl: string;
  embedUrl: string;
  caption: string;
};

export type LatestSocial = {
  instagram: LatestSocialPost;
  linkedin: LatestSocialPost;
};

// Used when the "socialPosts" document in Sanity is missing or invalid.
const FALLBACK = {
  instagramUrl: "https://www.instagram.com/reel/DgK1annti7W/",
  instagramCaption: "Gold is a seat belt. Not an engine.",
  linkedinUrl:
    "https://www.linkedin.com/feed/update/urn:li:activity:7502584039942549505/",
  linkedinCaption: "FIIs sold. DIIs bought more than double. What it means for your SIP.",
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
  linkedinUrl?: string;
  linkedinCaption?: string;
} | null;

function build(url: string | undefined, caption: string | undefined, fbUrl: string, fbCaption: string, embed: (u?: string) => string | null): LatestSocialPost {
  const e = embed(url);
  if (url && e && /^https:\/\//.test(url)) {
    return { postUrl: url, embedUrl: e, caption: caption?.trim() || fbCaption };
  }
  return { postUrl: fbUrl, embedUrl: embed(fbUrl)!, caption: fbCaption };
}

export async function getLatestSocial(): Promise<LatestSocial> {
  let d: Doc = null;
  try {
    d = await client.fetch<Doc>(SOCIAL_POSTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    d = null;
  }
  return {
    instagram: build(d?.instagramUrl, d?.instagramCaption, FALLBACK.instagramUrl, FALLBACK.instagramCaption, instagramEmbed),
    linkedin: build(d?.linkedinUrl, d?.linkedinCaption, FALLBACK.linkedinUrl, FALLBACK.linkedinCaption, linkedinEmbed),
  };
}
