const palettes = {
  light: {
    arch: '#B5664A',
    innerArch: '#C97B5C',
    innerOpacity: 0.5,
    c: '#2A1F1A',
    g: '#B5664A',
  },
  dark: {
    arch: '#C97B5C',
    innerArch: '#F4C9C0',
    innerOpacity: 0.55,
    c: '#FDF6EF',
    g: '#C97B5C',
  },
};

/**
 * Atelier Arch brand mark — arch doorway with CG monogram.
 * `variant="light"` for light backgrounds (default), `variant="dark"` for dark.
 * Size via className (e.g. "h-8 w-auto").
 */
export default function LogoMark({ variant = 'light', className = '' }) {
  const p = palettes[variant] ?? palettes.light;

  return (
    <svg
      viewBox="0 0 150 170"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 165 L20 75 A55 55 0 0 1 130 75 L130 165"
        fill="none"
        stroke={p.arch}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M34 165 L34 78 A41 41 0 0 1 116 78 L116 165"
        fill="none"
        stroke={p.innerArch}
        strokeWidth="2.2"
        opacity={p.innerOpacity}
      />
      <text
        x="75"
        y="128"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="62"
        fontWeight="600"
        fill={p.c}
        letterSpacing="-3"
      >
        C
        <tspan fill={p.g} fontStyle="italic">
          G
        </tspan>
      </text>
    </svg>
  );
}
