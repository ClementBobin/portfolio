import { LinkedInIcon } from "@/components/icons";

interface LinkedInBadgeProps {
  href: string;
}

export default async function LinkedInBadge({ href }: LinkedInBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A66C2]"
      aria-label="LinkedIn profile"
    >
      <LinkedInIcon className="h-2.5 w-2.5" />
    </a>
  );
}