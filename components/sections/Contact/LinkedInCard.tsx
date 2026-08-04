"use client"

import { LinkedInIcon } from "@/components/icons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";


interface LinkedInCardProps {
  url: string;
  label: string;
}

export default function LinkedInCard({ url, label }: LinkedInCardProps) {
  return (
    <Card className="flex flex-col gap-2.5 rounded-xl p-4">
      <CardHeader className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <LinkedInIcon width={15} height={15} />
        </span>
        <CardTitle>LinkedIn</CardTitle>
      </CardHeader>
      <CardContent>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-stone-50"
        >
          {label}
          <ExternalLink size={11} />
        </a>
      </CardContent>
    </Card>
  );
}