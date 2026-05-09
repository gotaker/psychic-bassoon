import localFont from "next/font/local";

// Variable fonts, self-hosted under public/fonts/.
// Each font exposes a CSS variable with a "-src" suffix that the @theme
// block in app/globals.css composes into the canonical --font-* tokens
// alongside system fallbacks. L10 will subset and convert to woff2.

export const fontSerif = localFont({
  src: "../public/fonts/SourceSerif4-Variable.ttf",
  variable: "--font-serif-src",
  weight: "200 900",
  display: "swap",
});

export const fontSans = localFont({
  src: "../public/fonts/InterTight-Variable.ttf",
  variable: "--font-sans-en-src",
  weight: "100 900",
  display: "swap",
});

export const fontSansHi = localFont({
  src: "../public/fonts/NotoSansDevanagari-Variable.ttf",
  variable: "--font-sans-hi-src",
  weight: "100 900",
  display: "swap",
});

export const fontMono = localFont({
  src: "../public/fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-mono-src",
  weight: "100 800",
  display: "swap",
});

export const fontVariableClassName = [
  fontSerif.variable,
  fontSans.variable,
  fontSansHi.variable,
  fontMono.variable,
].join(" ");
