// Small inline icons and the CM monogram, shared across the site.

export function Monogram({ size = 34, ink = "#F2F0EB", stroke = 26 }: { size?: number; ink?: string; stroke?: number }) {
  return (
    <svg viewBox="0 0 500 500" width={size} height={size} aria-hidden="true">
      <path d="M150 122 A130 130 0 0 0 150 382 L208 382 L208 178 L440 500" fill="none" stroke={ink} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M140 0 L415 382" fill="none" stroke="#5A86A0" strokeWidth={stroke} strokeLinecap="round" />
      <path d="M356 300 L485 122 L485 382" fill="none" stroke={ink} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M6 18 L18 6 M9 6 H18 V15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ color = "#8DB0C4" }: { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M5 12 H19 M13 6 L19 12 L13 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M12 4 V15 M7 10 L12 15 L17 10 M5 20 H19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M6 9 L12 15 L18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
