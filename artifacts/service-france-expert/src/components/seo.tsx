import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "localBusiness";
  schema?: Record<string, unknown>;
}

const DEFAULT_TITLE = "Service France Expert";
const DEFAULT_DESCRIPTION =
  "Cabinet d'accompagnement administratif premium pour les démarches en France, les titres de séjour et le suivi de dossiers.";
const DEFAULT_IMAGE = "/images/hero-bg.png";

export function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  keywords = [
    "service france expert",
    "démarches administratives france",
    "titre de séjour",
    "préfecture",
    "accompagnement administratif",
  ],
  type = "website",
  schema,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${DEFAULT_TITLE}`;
    const canonicalUrl = `https://servicefranceexpert.fr${path}`;
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type === "localBusiness" ? "LocalBusiness" : type === "article" ? "Article" : "WebSite",
      name: DEFAULT_TITLE,
      url: canonicalUrl,
      description,
      image: `https://servicefranceexpert.fr${image}`,
      areaServed: ["France", "Île-de-France", "Paris", "Lyon", "Marseille", "Nice"],
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 46.2276,
          longitude: 2.2137,
        },
        geoRadius: "100000",
      },
      ...schema,
    };

    document.title = fullTitle;
    document.documentElement.lang = "fr";

    const setMeta = (attr: string, value: string, name?: string) => {
      let element = document.querySelector(`meta[${attr}="${name ?? value}"]`);
      if (!element) {
        element = document.createElement("meta");
        if (name) {
          element.setAttribute(attr, name);
        } else {
          element.setAttribute(attr, value);
        }
        document.head.appendChild(element);
      }
      if (name) {
        element.setAttribute("content", value);
      }
    };

    setMeta("name", description, "description");
    setMeta("name", keywords.join(", "), "keywords");
    setMeta("property", "og:title", "og:title");
    setMeta("property", "og:description", "og:description");
    setMeta("property", "og:type", "og:type");
    setMeta("property", "og:image", "og:image");
    setMeta("property", "og:url", "og:url");
    setMeta("name", "index,follow", "robots");

    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="keywords"]')?.setAttribute("content", keywords.join(", "));
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", fullTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", type);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", `https://servicefranceexpert.fr${image}`);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let script = document.querySelector('script[data-seo-jsonld]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-jsonld", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(baseSchema);
  }, [title, description, path, image, keywords, type, schema]);

  return null;
}
