"use client"

import { EmailIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/hooks/useTranslations";
import { Check, Copy } from "lucide-react";
import { useState, useCallback } from "react";

interface EmailCardProps {
  email: string;
  locale: string;
}

export default function EmailCard({ email, locale }: EmailCardProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations(locale, ["email"]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <Card className="flex flex-col gap-2.5 rounded-xl p-4">
      <CardHeader className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <EmailIcon width={15} height={15} />
        </span>
        <CardTitle className="text-sm font-medium">{t("contact.mail")}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <span className="truncate text-[13px] text-foreground">{email}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copy}
          className="h-7 shrink-0 rounded-lg border-stone-200 px-3 text-xs font-medium hover:bg-stone-50"
        >
          {copied ? (
            <><Check size={11} className="mr-1" />{t("contact.copied")}</>
          ) : (
            <><Copy size={11} className="mr-1" />{t("contact.copy")}</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
