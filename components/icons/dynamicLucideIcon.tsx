import * as Icons from "lucide-react";
import { LucideProps, ShieldAlert } from "lucide-react";
import Image from "next/image"

interface DynamicIconProps {
  iconHref?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function DynamicLucideIcon({
  name = "ShieldAlert",
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  absoluteStrokeWidth = false,
}: {
  name?: string;
} & LucideProps) {
  const Icon =
    name && name.trim() !== ""
      ? (Icons[name as keyof typeof Icons] as React.FC<LucideProps>)
      : null;

  const Component = Icon ?? ShieldAlert;

  return (
    <Component
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={absoluteStrokeWidth}
    />
  );
}

/**
 * Renders an image-based icon when an icon URL is provided.
 *
 * Returns `null` when no icon URL is available.
 */
export function DynamicIcon({ iconHref, alt = "", width = 24, height = 24 }: DynamicIconProps) {
  if (iconHref?.trim()) return <Image src={iconHref} alt={alt} width={width} height={height} className="mr-1" />
  return null
}