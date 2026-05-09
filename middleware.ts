import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/lib/i18n-routing";

const intlMiddleware = createMiddleware(routing);

// Behind Railway's edge proxy, Next's `nextUrl.host` carries the container's
// internal listening port (e.g. 8080). next-intl builds redirects from
// `nextUrl`, so the Location header leaks `:8080` to the browser. Strip any
// non-default port from same-host redirects before responding.
export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const location = response.headers.get("location");
  if (location) {
    try {
      const url = new URL(location, request.nextUrl);
      const isDefaultPort =
        (url.protocol === "https:" && (url.port === "" || url.port === "443")) ||
        (url.protocol === "http:" && (url.port === "" || url.port === "80"));
      if (!isDefaultPort) {
        url.port = "";
        response.headers.set("location", url.toString());
      }
    } catch {
      // Non-URL Location (relative path) — leave untouched.
    }
  }
  return response;
}

export const config = {
  // Match all pathnames except API, Next internals, /_dev surfaces, and static files.
  matcher: ["/((?!api|_next|_vercel|primitives|tokens|.*\\..*).*)"],
};
