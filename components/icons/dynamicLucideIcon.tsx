import * as Icons from "lucide-react";
import { LucideProps, ShieldAlert } from "lucide-react";
import Image from "next/image"

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

export function DynamicIcon({ iconHref, alt = "", width = 24, height = 24 }: {
  iconHref?: string
  alt?: string
  width?: number
  height?: number
}) {
  if (iconHref?.trim()) return <Image src={iconHref} alt={alt} width={width} height={height} className="mr-1" />
  return null
}