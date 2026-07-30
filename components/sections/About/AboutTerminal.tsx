"use client";

import { useRef, useState } from "react";
import { Terminal } from "lucide-react";
import type { PortfolioData } from "@/lib/types/portfolio-api";

// ---------------------------------------------------------------------------
// Resolver — handles any shape: string, { en, fr }, nested objects
// ---------------------------------------------------------------------------

function l(val: unknown, locale: string): string {
  if (val == null) return "";
  if (typeof val === "string") return val;
  if (typeof val !== "object" || Array.isArray(val)) return "";

  const map = val as Record<string, unknown>;

  const direct = map[locale] ?? map["en"] ?? map["fr"];
  if (typeof direct === "string") return direct;

  for (const v of Object.values(map)) {
    if (typeof v === "string") return v;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const inner = (v as Record<string, unknown>)[locale]
        ?? (v as Record<string, unknown>)["en"]
        ?? (v as Record<string, unknown>)["fr"];

      if (typeof inner === "string") return inner;
    }
  }

  return "";
}

// ---------------------------------------------------------------------------
// Command registry
// ---------------------------------------------------------------------------

function buildCommands(
  portfolio: PortfolioData,
  locale: string,
): Record<string, () => string[]> {
  const {
    personal,
    contact,
    skills,
    experiences,
    education,
    projects,
    hobbies,
  } = portfolio;

  return {
    help: () => [
      "AVAILABLE COMMANDS:",
      "  help        — Show this list",
      "  bio         — Profile & summary",
      "  contact     — Contact details",
      "  skills      — Technical skills",
      "  experience  — Work experience",
      "  education   — Education",
      "  projects    — Featured projects",
      "  hobbies     — Interests & hobbies",
      "  clear       — Clear terminal",
    ],

    bio: () => [
      "PROFILE:",
      `  Name      : ${personal.name}`,
      `  Title     : ${l(personal.title, locale)}`,
      `  Location  : ${personal.location}`,
      ...(personal.status
        ? [`  Status    : ${l(personal.status, locale)}`]
        : []),
      "",
      l(personal.summary, locale),
    ],

    contact: () => [
      "CONTACT:",
      ...contact.flatMap((c) =>
        c.label
          ? [
              `  ${c.type.padEnd(10)}: ${c.label}${c.href ? `  →  ${c.href}` : ""}`,
            ]
          : [],
      ),
    ],

    skills: () => {
      const lines: string[] = ["SKILLS:"];

      for (const section of skills) {
        lines.push(`  ${l(section.title, locale).toUpperCase()}`);

        const names = section.items.flatMap((item) => {
          const name = l(item.name, locale);
          return name ? [name] : [];
        });

        lines.push(`    ${names.join(", ")}`);
      }

      return lines;
    },

    experience: () => {
      const lines: string[] = ["EXPERIENCE:"];

      for (const exp of experiences) {
        lines.push(`  ${l(exp.role, locale)} @ ${l(exp.company, locale)}`);
        lines.push(`    ${l(exp.period, locale)}  ·  ${l(exp.type, locale)}`);

        const desc = l(exp.description, locale);
        if (desc) lines.push(`    ${desc}`);

        lines.push("");
      }

      return lines;
    },

    education: () => {
      const lines: string[] = ["EDUCATION:"];

      for (const edu of education) {
        lines.push(`  ${l(edu.school, locale)}`);
        lines.push(`    ${l(edu.degree, locale)}  ·  ${edu.period}`);

        if (edu.specialty) {
          lines.push(`    ${l(edu.specialty, locale)}`);
        }

        lines.push("");
      }

      return lines;
    },

    projects: () => {
      const lines: string[] = ["PROJECTS:"];

      for (const proj of projects) {
        lines.push(`  ${l(proj.title, locale)}`);
        lines.push(`    ${l(proj.description, locale)}`);

        const techs = proj.techs.map((tech) => tech.name).join(", ");
        if (techs) lines.push(`    Stack : ${techs}`);

        if (proj.url) lines.push(`    URL   : ${proj.url}`);
        if (proj.github) lines.push(`    GitHub: ${proj.github}`);

        lines.push("");
      }

      return lines;
    },

    hobbies: () => {
      const lines: string[] = ["HOBBIES:"];

      for (const hobby of hobbies) {
        const details = hobby.details.flatMap((d) => {
          const detail = l(d, locale);
          return detail ? [detail] : [];
        });

        lines.push(`  ${hobby.emoji ?? "·"} ${l(hobby.title, locale)}`);

        if (details.length) {
          lines.push(`    ${details.join("  ·  ")}`);
        }
      }

      return lines;
    },
  };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Line {
  id: string;
  text: string;
  kind: "system" | "input" | "output" | "error";
}

interface AboutTerminalProps {
  portfolio: PortfolioData;
  locale: string;
}

function createLine(text: string, kind: Line["kind"]): Line {
  return {
    id: crypto.randomUUID(),
    text,
    kind,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Renders an interactive CLI terminal UI for browsing portfolio data.
 *
 * Supports commands such as `help`, `bio`, `skills`, `experience`, and more,
 * with command history navigation via the arrow keys.
 *
 * @param portfolio - Full portfolio data used to populate command output.
 * @param locale    - BCP 47 locale used to resolve localised string values.
 */
export default function AboutTerminal({
  portfolio,
  locale,
}: AboutTerminalProps) {
  const { personal } = portfolio;

  const shellPrompt = `${personal.name
    .toLowerCase()
    .replace(/\s+/g, "")}@portfolio:~`;

  const commands = buildCommands(portfolio, locale);

  const [lines, setLines] = useState<Line[]>([
    createLine("Type 'help' for available commands.", "system"),
    createLine("", "system"),
  ]);

  const [input, setInput] = useState("");

  const historyRef = useRef<string[]>([]);
  const historyIdxRef = useRef(-1);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    const el = outputRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();

    if (!cmd) return;

    historyRef.current = [raw, ...historyRef.current];
    historyIdxRef.current = -1;

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const handler = commands[cmd];

    const response = handler
      ? handler().map((text) => createLine(text, "output"))
      : [
          createLine(
            `command not found: '${cmd}'. Type 'help'.`,
            "error",
          ),
        ];

    setLines((prev) => [
      ...prev,
      createLine(`$ ${raw}`, "input"),
      ...response,
      createLine("", "system"),
    ]);

    setInput("");
    requestAnimationFrame(scrollToBottom);
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      const next = Math.min(
        historyIdxRef.current + 1,
        historyRef.current.length - 1,
      );

      historyIdxRef.current = next;
      setInput(historyRef.current[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();

      const next = Math.max(historyIdxRef.current - 1, -1);

      historyIdxRef.current = next;
      setInput(
        next === -1 ? "" : historyRef.current[next] ?? "",
      );
    }
  };

  return (
    <div className="flex h-80 w-full flex-col overflow-hidden rounded-xl border border-border bg-[#0d1117] font-mono text-[11px]">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-2">
        <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
          <Terminal size={12} aria-hidden />
          {shellPrompt}
        </span>

        <span className="text-muted-foreground">zsh</span>
      </div>

      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed"
      >
        {lines.map((line) => (
          <div key={line.id} className="whitespace-pre-wrap">
            {line.kind === "input" && (
              <span className="font-bold text-violet-400">
                {line.text}
              </span>
            )}

            {line.kind === "error" && (
              <span className="text-red-400">
                {line.text}
              </span>
            )}

            {line.kind === "system" && (
              <span className="text-muted-foreground">
                {line.text}
              </span>
            )}

            {line.kind === "output" && (
              <span className="text-foreground/80">
                {line.text}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* The label's htmlFor association makes the entire bottom bar
          a native click-to-focus target — no onClick handler needed. */}
      <div className="flex shrink-0 items-center gap-2 border-t border-border px-4 py-2.5">
        <label
          htmlFor="terminal-input"
          className="flex cursor-text items-center gap-2 font-bold text-emerald-400"
        >
          <span className="sr-only">Terminal command input</span>
          <span aria-hidden>$</span>
        </label>

        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type 'help'..."
          className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}