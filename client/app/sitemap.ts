import { products } from "@/lib/products";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...products.map(({ slug }) => ({ url: `${siteUrl}/products/${slug}`, changeFrequency: "monthly" as const, priority: .8 })),
    { url: `${siteUrl}/project-planning`, changeFrequency: "monthly", priority: .7 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: .2 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: .2 },
  ];
}
