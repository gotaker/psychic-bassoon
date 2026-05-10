import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts");

const config: NextConfig = {
  reactStrictMode: true,
  // typedRoutes: true is incompatible with dynamic locale-prefixed hrefs
  // until we migrate Link/useRouter to next-intl/navigation. Re-enable in L10.
  typedRoutes: false,
  // Standalone output → minimal Docker image (only runtime deps, no node_modules).
  output: "standalone",
  images: {
    // Allowlist for the Google News RSS news-feed thumbnails. Mirrored in
    // lib/news/google-news.ts IMAGE_HOST_ALLOWLIST — keep both in sync.
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "news.google.com" },
      { protocol: "https", hostname: "**.gstatic.com" },
    ],
  },
};

export default withNextIntl(config);
