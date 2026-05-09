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
};

export default withNextIntl(config);
