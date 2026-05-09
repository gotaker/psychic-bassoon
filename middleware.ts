import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n-routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API, Next internals, /_dev surfaces, and static files.
  matcher: ["/((?!api|_next|_vercel|primitives|tokens|.*\\..*).*)"],
};
