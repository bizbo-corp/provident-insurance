/**
 * Line art for the overview's three next-step cards, taken from the Bizbo
 * site so the review reads as Bizbo's document: Phosphor thin glyphs (as the
 * site's icon cells use) and the laptop from the site's FIG 0.2.
 * Everything draws in currentColor, so it reverses with the text.
 */

export type StepArtKind = "review" | "preview" | "figma";

/** Phosphor CheckCircle, thin weight. */
function CheckCircle() {
  return (
    <svg viewBox="0 0 256 256" className="h-24 w-24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M170.83,101.17a4,4,0,0,1,0,5.66l-56,56a4,4,0,0,1-5.66,0l-24-24a4,4,0,0,1,5.66-5.66L112,154.34l53.17-53.17A4,4,0,0,1,170.83,101.17ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"
      />
    </svg>
  );
}

/** Phosphor FigmaLogo, thin weight. */
function FigmaLogo() {
  return (
    <svg viewBox="0 0 256 256" className="h-24 w-24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M184.46,96A36,36,0,0,0,168,28H96A36,36,0,0,0,79.54,96a36,36,0,0,0,1.56,64.76A40,40,0,1,0,140,196V150.59A36,36,0,1,0,184.46,96ZM196,64a28,28,0,0,1-28,28H140V36h28A28,28,0,0,1,196,64Zm-56,36h5.41a36.41,36.41,0,0,0-5.41,5.41ZM68,64A28,28,0,0,1,96,36h36V92H96A28,28,0,0,1,68,64Zm64,132a32,32,0,1,1-32-32h32Zm0-40H96a28,28,0,0,1,0-56h36Zm36,0a28,28,0,1,1,28-28A28,28,0,0,1,168,156Z"
      />
    </svg>
  );
}

/** A laptop, from the Bizbo site's FIG 0.2 (lid and base only). */
function Devices() {
  return (
    <svg viewBox="14 56 148 102" className="linework bz-stepart-devices h-24 w-auto" aria-hidden="true">
      <rect x="32" y="64" width="112" height="72" rx="4" />
      <path d="M22 150 H154 L146 140 H30 Z" />
    </svg>
  );
}

export function StepArt({ kind }: { kind: StepArtKind }) {
  return (
    <span className="bz-stepart flex aspect-[16/9] items-center justify-center">
      {kind === "review" && <CheckCircle />}
      {kind === "preview" && <Devices />}
      {kind === "figma" && <FigmaLogo />}
    </span>
  );
}
