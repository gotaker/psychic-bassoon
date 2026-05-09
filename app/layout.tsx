// Locale-aware root html/body lives in app/[locale]/layout.tsx.
// Non-localized routes (sitemap, robots) skip this and render directly.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
