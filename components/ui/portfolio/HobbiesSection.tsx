import {
  BookOpenIcon,
  HeartIcon,
  ServerIcon,
  SettingsIcon,
  StarIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Hobby } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface HobbiesSectionProps {
  hobbies: Hobby[];
  locale: string;
}

function getHobbyIcon(iconName: string) {
  switch (iconName) {
    case "Heart":
      return HeartIcon;
    case "BookOpen":
      return BookOpenIcon;
    case "Settings":
      return SettingsIcon;
    case "Server":
      return ServerIcon;
    default:
      return StarIcon;
  }
}

export function HobbiesSection({ hobbies, locale }: HobbiesSectionProps) {
  const lang = locale.split("-")[0] as "en" | "fr";

  return (
    <section className="space-y-6 min-h-screen">
      <SectionHeading title={lang === "fr" ? "Centres d'intérêt" : "Hobbies"} />

      <div className="grid gap-4 sm:grid-cols-2">
        {hobbies.map((hobby, i) => {
          const Icon = getHobbyIcon(hobby.icon);
          return (
            <Card
              key={i}
              className="border bg-card hover:shadow-sm hover:border-primary/20 transition-all group"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  {hobby.title[lang]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {hobby.details.map((detail, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                      {detail[lang]}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
