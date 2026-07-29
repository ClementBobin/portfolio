"use client";

import { useState, useCallback, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useTranslations";
import LinkedInCard from "./LinkedInCard";
import EmailCard from "./EmailCard";

interface ContactDialogProps {
  trigger: ReactNode;
  email?: string;
  linkedinUrl?: string;
  linkedinLabel?: string;
  locale: string;
}

type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

/**
 * Renders a contact dialog with email and LinkedIn quick-links alongside
 * a validated contact form that submits to the /api/contact route.
 *
 * @param trigger       - Element that opens the dialog when clicked.
 * @param email         - Optional email address shown in the email card.
 * @param linkedinUrl   - Optional LinkedIn profile URL.
 * @param linkedinLabel - Display label for the LinkedIn link.
 * @param locale        - BCP 47 locale used to load translated strings.
 */
export default function ContactDialog({
  trigger,
  email,
  linkedinUrl,
  linkedinLabel,
  locale,
}: ContactDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sent" | "error">("idle");
  const t = useTranslations(locale, ["email"]);

  const contactSchema = z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    email: z.string().email(t("validation.emailInvalid")),
    phone: z.string().optional(),
    message: z.string().min(10, t("validation.messageMin")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = useCallback(
    async (data: ContactFormValues) => {
      setSubmitStatus("idle");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("API error");
        const body = await res.json() as { ok: boolean };
        if (!body.ok) throw new Error("Delivery error");
        setSubmitStatus("sent");
        reset();
      } catch {
        setSubmitStatus("error");
      }
    },
    [reset],
  );

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      reset();
      setSubmitStatus("idle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-105 gap-0 overflow-hidden rounded-2xl p-0">
        {/* -- Header ------------------------------------------------------- */}
        <DialogHeader className="px-5 pb-1 pt-5">
          <DialogTitle className="text-base font-semibold">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        {/* -- Body --------------------------------------------------------- */}
        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          {/* Contact cards */}
          {email && <EmailCard email={email} locale={locale} />}
          {linkedinUrl && linkedinLabel && (
            <LinkedInCard url={linkedinUrl} label={linkedinLabel} />
          )}

          {/* Separator */}
          <FieldSeparator className="text-xs">
            {t("separator")}
          </FieldSeparator>

          {/* -- Sent state ------------------------------------------------- */}
          {submitStatus === "sent" ? (
            <div className="rounded-xl bg-emerald-100 px-4 py-5 text-center">
              <p className="text-sm font-semibold text-emerald-800">{t("sent")}</p>
              <p className="mt-1 text-xs text-emerald-700">{t("sentDesc")}</p>
            </div>
          ) : (
            /* -- Form ---------------------------------------------------- */
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup className="flex flex-col gap-3">

                {/* Name */}
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="cd-name" className="text-[13px] font-medium">
                    {t("nameLbl")}
                  </FieldLabel>
                  <Input
                    id="cd-name"
                    placeholder={t("namePh")}
                    autoComplete="off"
                    aria-invalid={!!errors.name}
                    className="rounded-xl border-stone-200 bg-white text-sm focus-visible:border-[#3b5a3a] focus-visible:ring-[#3b5a3a]/20"
                    {...register("name")}
                  />
                  <FieldError errors={[errors.name]} />
                </Field>

                {/* Email */}
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="cd-email" className="text-[13px] font-medium">
                    {t("emailLbl")}
                  </FieldLabel>
                  <Input
                    id="cd-email"
                    type="email"
                    placeholder={t("emailPh")}
                    autoComplete="off"
                    aria-invalid={!!errors.email}
                    className="rounded-xl border-stone-200 bg-white text-sm focus-visible:border-[#3b5a3a] focus-visible:ring-[#3b5a3a]/20"
                    {...register("email")}
                  />
                  <FieldError errors={[errors.email]} />
                </Field>

                {/* Message */}
                <Field data-invalid={!!errors.message}>
                  <FieldLabel htmlFor="cd-message" className="text-[13px] font-medium">
                    {t("msgLbl")}
                  </FieldLabel>
                  <Textarea
                    id="cd-message"
                    placeholder={t("msgPh")}
                    rows={4}
                    aria-invalid={!!errors.message}
                    className="resize-none rounded-xl border-stone-200 bg-white text-sm focus-visible:border-[#3b5a3a] focus-visible:ring-[#3b5a3a]/20"
                    {...register("message")}
                  />
                  <FieldError errors={[errors.message]} />
                </Field>

                {/* API error banner */}
                {submitStatus === "error" && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                    {t("error")}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 w-full rounded-xl bg-[#3b5a3a] py-3 text-sm font-medium text-white hover:bg-[#2d4f2c] disabled:opacity-55"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="mr-2 animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    t("send")
                  )}
                </Button>
              </FieldGroup>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ContactDialog };