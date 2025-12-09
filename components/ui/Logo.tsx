import Image from "next/image";
import Link from "next/link";

type LogoVariant = "color" | "dark" | "light";

type LogoProps = {
  variant?: LogoVariant;
  width?: number;
  href?: string;
  className?: string;
};

const LOGO_SOURCES: Record<LogoVariant, string> = {
  color: "/media/brand/agile-onion-logo-color.svg",
  dark: "/media/brand/agile-onion-logo-black.svg",
  light: "/media/brand/agile-onion-logo-white.svg",
};

export function Logo({ variant = "color", width = 220, href, className = "" }: LogoProps) {
  const height = Math.round(width * 0.334);
  const logoImage = (
    <Image
      src={LOGO_SOURCES[variant]}
      alt="Agile Onion"
      width={width}
      height={height}
      style={{ width, height: "auto" }}
      className={`shrink-0 ${className}`}
      priority={variant === "color"}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center" aria-label="Agile Onion">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
