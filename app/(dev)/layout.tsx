import "../globals.css";
import { fontVariableClassName } from "@/lib/fonts";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-density="regular" data-palette="teal" className={fontVariableClassName}>
      <body>{children}</body>
    </html>
  );
}
