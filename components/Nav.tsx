import Link from "next/link";

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 80%, transparent)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 md:px-12 h-[52px]">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-bold text-[15px] tracking-tight">CRFT</span>
        </Link>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 409 409" fill="none" aria-hidden>
      <rect x="9" y="9" width="392.64" height="392.64" rx="80" fill="#185C37" />
    </svg>
  );
}