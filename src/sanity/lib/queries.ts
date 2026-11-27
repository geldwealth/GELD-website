export const BLOGS_QUERY = `
*[_type == "blog"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  featuredImage{
    asset->,
    alt
  },
  author,
  category,
  readingTime,
  publishedAt
}
`;

export const BLOG_QUERY = `
*[_type=="blog" && slug.current==$slug][0]{
  _id,
  title,
  tableOfContents,
  slug,
  excerpt,
  content,
  faqs[]{
    _key,
    question,
    answer
  },
  featuredImage{
    asset->{
      url
    },
    alt
  },
  author,
  category,
  readingTime,
  publishedAt
}
`;

export const WEBINAR_QUERY = `
*[_id == "webinar"][0]{
  poster{
    asset->,
    alt,
    hotspot,
    crop
  }
}
`;

// Weekly session details. The landing page document (lp.geldwealth.com) is
// updated every week from the Zoom session, so the main site reads the same
// title, topics and registration link from it.
export const WEBINAR_DETAILS_QUERY = `
*[_id == "landingWebinar"][0]{
  heroEyebrow,
  heroHeadline,
  heroHighlight,
  heroSubtitle,
  eventMeta,
  eventDateTime,
  registerUrl,
  "points": topics[].points[]
}
`;