import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fieldstone-site.vercel.app";
  const routes = ["", "/services", "/gallery", "/about", "/contact", "/estimate", "/privacy", "/terms", "/accessibility"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
