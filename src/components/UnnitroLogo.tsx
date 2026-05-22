"use client";

import Image from "next/image";

interface UnnitroLogoProps {
  /** Width & height in pixels (1:1 ratio) */
  size?: number;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Unnitro brand logo — The official hexagonal metallic logo
 * with "UN" monogram, rendered from the actual brand asset image.
 * 
 * Uses Next.js Image component for automatic optimization.
 * Maintains 1:1 aspect ratio at any size.
 */
export default function UnnitroLogo({ size = 40, className = "" }: UnnitroLogoProps) {
  return (
    <Image
      src="/unnitro-logo.jpg"
      alt="Unnitro Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
      style={{ width: size, height: size }}
    />
  );
}
