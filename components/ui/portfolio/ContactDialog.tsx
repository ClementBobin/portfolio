"use client";

import { Check, Github, ExternalLink, Linkedin, X } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Button } from "../button";

import type { ContactItem } from "@/lib/types/portfolio-api";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
  contact: ContactItem[];
}

type SendState = "idle" | "sending" | "sent" | "error";

export function ContactDialog({ open, onClose, contact }: ContactDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");

  const github = contact.find((c) => c.type === "github");
  const linkedin = contact.find((c) => c.type === "linkedin");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSendState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      setSendState(res.ok ? "sent" : "error");
    } catch {
      setSendState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <Card className="relative z-10 w-full max-w-sm shadow-2xl animate-in zoom-in-95 fade-in duration-200">

        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <CardTitle>Me contacter</CardTitle>

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
          >
            <X />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Github */}
          {github?.href && (
            <Card className="p-4 gap-3">

              <div className="flex items-center gap-2">
                <Github className="size-4" />
                <span className="text-sm font-medium">Github</span>
              </div>

              <Button
                asChild
                variant="outline"
                size="xs"
                className="w-fit"
              >
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir mon profil
                  <ExternalLink />
                </a>
              </Button>

            </Card>
          )}

          {/* LinkedIn */}
          {linkedin?.href && (
            <Card className="p-4 gap-3">

              <div className="flex items-center gap-2">
                <Linkedin className="size-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </div>

              <Button
                asChild
                variant="outline"
                size="xs"
                className="w-fit"
              >
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir mon profil
                  <ExternalLink />
                </a>
              </Button>

            </Card>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">
              ou envoyez-moi un message
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Success */}
          {sendState === "sent" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">

              <div className="size-12 rounded-full bg-green-500/15 flex items-center justify-center">
                <Check className="size-6 text-green-500" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold">
                  Message envoyé !
                </p>

                <p className="text-xs text-muted-foreground">
                  Je vous répondrai dès que possible.
                </p>
              </div>

              <Button
                variant="link"
                size="xs"
                onClick={() => {
                  setSendState("idle");
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
              >
                Envoyer un autre message
              </Button>

            </div>
          ) : (

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>

                <Input
                  id="name"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>

                <textarea
                  id="message"
                  placeholder="Votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 resize-none"
                />
              </div>

              {sendState === "error" && (
                <p className="text-xs text-destructive">
                  Une erreur est survenue. Réessayez.
                </p>
              )}

              <Button
                type="submit"
                disabled={sendState === "sending"}
                className="w-full"
              >
                {sendState === "sending" ? (
                  <>
                    <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Envoi…
                  </>
                ) : (
                  "Envoyer"
                )}
              </Button>

            </form>
          )}

        </CardContent>
      </Card>
    </div>
  );
}