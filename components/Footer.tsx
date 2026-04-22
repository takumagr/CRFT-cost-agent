import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-subtle)" }}
    >
      <div className="border-t px-6 md:px-12 py-4 text-[11px] text-[var(--color-text-secondary)]" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <span>© {new Date().getFullYear()} for Crafts, Inc.</span>
          <span>CRFT v0.9 β</span>
        </div>
      </div>
    </footer>
  );
}
