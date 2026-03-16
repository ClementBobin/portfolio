"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import type { StrengthItem } from "@/lib/types/portfolio-api"

interface Props {
  strength: StrengthItem
  locale: string
}

export function StrengthSection({ strength, locale }: Props) {
  const lang = locale.split("-")[0] as "fr" | "en"

  const [activeId, setActiveId] = useState(
    strength.strengths[0]?.id ?? null
  )

  const activeNode = strength.strengths.find(
    (s) => s.id === activeId
  )

  const activePercentage = activeNode?.percentage ?? 0

  return (
    <section className="py-24 space-y-16">

      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-serif font-semibold">
          {lang === "fr" ? "Mes points forts" : "My strengths"}
        </h2>

        {strength.detail?.short && (
          <p className="text-muted-foreground text-sm">
            {strength.detail.short[lang]}
          </p>
        )}
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">

        {/* base line */}
        <div className="absolute top-5 left-0 right-0 h-[3px] bg-muted" />

        {/* progress line */}
        <div
          className="absolute top-5 left-0 h-[3px] bg-accent transition-all duration-500"
          style={{ width: `${activePercentage}%` }}
        />

        {/* nodes */}
        <div className="flex justify-between items-start relative">

          {strength.strengths.map((node) => {

            const isActive = activePercentage >= node.percentage

            return (
              <button
                key={node.id}
                onMouseEnter={() => setActiveId(node.id)}
                className="flex flex-col items-center gap-3 relative z-10 group"
              >

                <div
                  className={cn(
                    "w-8 h-8 rounded-full border-4 transition-all duration-300",
                    isActive
                      ? "bg-accent border-accent"
                      : "bg-muted border-muted"
                  )}
                />

                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground"
                  )}
                >
                  {node.label[lang]}
                </span>

              </button>
            )
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Example / description */}
        <div className="space-y-6">

          {strength.detail?.title && (
            <h3 className="text-xl font-semibold">
              {strength.detail.title[lang]}
            </h3>
          )}

          {activeNode && (
            <p className="text-muted-foreground leading-relaxed">
              {activeNode.description[lang]}
            </p>
          )}

          {strength.detail?.description && (
            <p className="text-sm text-muted-foreground">
              {strength.detail.description[lang]}
            </p>
          )}

          {strength.detail?.exampleHref && (
            <a
              href={strength.detail.exampleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              {lang === "fr"
                ? "Voir un exemple concret"
                : "See real example"}
            </a>
          )}

        </div>

        {/* Category cards */}
        {strength.detail?.categories && (
          <div className="space-y-4">

            {strength.detail.categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl border bg-card"
              >
                <h4 className="text-sm font-semibold mb-1">
                  {cat.title[lang]}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {cat.description[lang]}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  )
}