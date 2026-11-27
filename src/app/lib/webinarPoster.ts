import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { WEBINAR_DETAILS_QUERY, WEBINAR_QUERY } from "@/sanity/lib/queries";

const FALLBACK_POSTER = {
  src: "/webinar_poster.jpg",
  alt: "GELD Wealth free weekly webinar poster",
} as const;

export type WebinarDetails = {
  eyebrow?: string;
  headline?: string;
  highlight?: string;
  subtitle?: string;
  meta?: string;
  registerUrl?: string;
  points?: string[];
};

export type WebinarPoster = {
  src: string;
  alt: string;
  details?: WebinarDetails;
};

type WebinarDetailsDoc = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHighlight?: string;
  heroSubtitle?: string;
  eventMeta?: string;
  registerUrl?: string;
  points?: (string | null)[];
} | null;

async function getWebinarDetails(): Promise<WebinarDetails | undefined> {
  try {
    const d = await client.fetch<WebinarDetailsDoc>(
      WEBINAR_DETAILS_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
    if (!d) return undefined;
    const registerUrl =
      typeof d.registerUrl === "string" && /^https:\/\//.test(d.registerUrl)
        ? d.registerUrl
        : undefined;
    return {
      eyebrow: d.heroEyebrow?.trim() || undefined,
      headline: d.heroHeadline?.trim() || undefined,
      highlight: d.heroHighlight?.trim() || undefined,
      subtitle: d.heroSubtitle?.trim() || undefined,
      meta: d.eventMeta?.trim() || undefined,
      registerUrl,
      points: (d.points || [])
        .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
        .slice(0, 6),
    };
  } catch {
    return undefined;
  }
}

type WebinarDoc = {
  poster?: {
    asset?: { _id?: string; _ref?: string };
    alt?: string;
  };
} | null;

export async function getWebinarPoster(): Promise<WebinarPoster> {
  const details = await getWebinarDetails();
  try {
    const data = await client.fetch<WebinarDoc>(
      WEBINAR_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    if (data?.poster?.asset) {
      return {
        src: urlFor(data.poster).width(1280).auto("format").quality(90).url(),
        alt: data.poster.alt?.trim() || FALLBACK_POSTER.alt,
        details,
      };
    }
  } catch {
    // Fall back to the local poster if Sanity is unavailable.
  }

  return { ...FALLBACK_POSTER, details };
}
