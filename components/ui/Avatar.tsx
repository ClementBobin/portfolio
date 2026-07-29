import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
}

export default async function Avatar({ src, name }: AvatarProps) {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
      {src ? (
        <Image src={src} alt={name} sizes="40px" fill className="object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}