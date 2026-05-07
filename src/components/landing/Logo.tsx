type LogoProps = {
  className?: string;
  textClassName?: string;
  iconSize?: number;
  showText?: boolean;
};

/**
 * CertiLingua brand logo.
 * Premium gradient shield with inner bevel, glow, ribbon flourish and a crisp checkmark.
 * Pure SVG, Inter typography.
 */
export function Logo({
  className = "",
  textClassName = "text-white",
  iconSize = 32,
  showText = true,
}: LogoProps) {
  const id = "cl";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 drop-shadow-[0_2px_6px_rgba(45,91,255,0.35)]"
      >
        <defs>
          <linearGradient id={`${id}-shield`} x1="20" y1="2" x2="20" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5B82FF" />
            <stop offset="55%" stopColor="#2D5BFF" />
            <stop offset="100%" stopColor="#1E3FB8" />
          </linearGradient>
          <linearGradient id={`${id}-bevel`} x1="20" y1="4" x2="20" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-ribbon`} x1="10" y1="32" x2="30" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5B637" />
            <stop offset="100%" stopColor="#E89A0F" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="20" cy="14" r="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ribbon tails behind shield */}
        <path d="M9 30 L6 38 L13 35 Z" fill={`url(#${id}-ribbon)`} />
        <path d="M31 30 L34 38 L27 35 Z" fill={`url(#${id}-ribbon)`} />
        <path d="M9 30 L11 33 L8 34 Z" fill="#B97A0A" opacity="0.6" />
        <path d="M31 30 L29 33 L32 34 Z" fill="#B97A0A" opacity="0.6" />

        {/* Shield body */}
        <path
          d="M20 2.5L34 6.8V16.5C34 24.6 28.4 32 20 35C11.6 32 6 24.6 6 16.5V6.8L20 2.5Z"
          fill={`url(#${id}-shield)`}
        />
        {/* Inner glow */}
        <path
          d="M20 2.5L34 6.8V16.5C34 24.6 28.4 32 20 35C11.6 32 6 24.6 6 16.5V6.8L20 2.5Z"
          fill={`url(#${id}-glow)`}
        />
        {/* Inner bevel stroke */}
        <path
          d="M20 5L31.5 8.5V16.5C31.5 23.3 26.7 29.5 20 32.2C13.3 29.5 8.5 23.3 8.5 16.5V8.5L20 5Z"
          stroke={`url(#${id}-bevel)`}
          strokeWidth="1"
          fill="none"
        />

        {/* Subtle laurel marks */}
        <circle cx="20" cy="6.5" r="0.9" fill="#FFFFFF" opacity="0.8" />

        {/* Checkmark with shadow */}
        <path
          d="M13.2 19.8L17.6 24.2L26.8 14.4"
          stroke="#0B1D5C"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.35"
          transform="translate(0,1)"
        />
        <path
          d="M13.2 19.8L17.6 24.2L26.8 14.4"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {showText ? (
        <span
          className={`font-sans text-[18px] leading-none tracking-[-0.02em] ${textClassName}`}
        >
          <span className="font-semibold">Certi</span>
          <span className="font-bold">Lingua</span>
        </span>
      ) : null}
    </span>
  );
}
