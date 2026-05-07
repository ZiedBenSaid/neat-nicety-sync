import globeBg from "@/assets/globe-bg.png";

/**
 * Decorative dotted world-map background used behind sections
 * (Languages, Features, CTA) per Figma reference.
 */
export function GlobeBackdrop({
  className = "",
  opacity = 0.55,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-0 flex items-center justify-center overflow-hidden ${className}`}
    >
      <img
        src={globeBg}
        alt=""
        loading="lazy"
        className="w-[110%] max-w-none object-contain"
        style={{ opacity }}
      />
    </div>
  );
}
