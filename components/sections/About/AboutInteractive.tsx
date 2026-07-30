import Image from "next/image";
import { CreditCard, Terminal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AboutTerminal from "./AboutTerminal";
import type { PortfolioPersonal, PortfolioData } from "@/lib/types/portfolio-api";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AboutInteractiveProps {
  personal: PortfolioPersonal;
  portfolio: PortfolioData;
  locale: string;
}

/**
 * Renders the interactive About section with a tabbed interface offering a
 * profile card view and a CLI terminal view.
 *
 * @param personal  - Personal data used to render the profile card (photo, name).
 * @param portfolio - Full portfolio data passed through to the terminal view.
 * @param locale    - BCP 47 locale forwarded to the terminal for localised output.
 */
export default async function AboutInteractive({ personal, portfolio, locale }: AboutInteractiveProps) {
  return (
    <Tabs defaultValue="card" className="flex flex-col gap-3">
      <TabsList className="w-fit self-center font-mono text-xs">
        <TabsTrigger value="card" className="flex items-center gap-1.5">
          <CreditCard size={13} />
          Profile Card
        </TabsTrigger>
        <TabsTrigger value="terminal" className="flex items-center gap-1.5">
          <Terminal size={13} />
          CLI Console
        </TabsTrigger>
      </TabsList>

      <TabsContent value="card">
        <div className="relative mx-auto w-64 md:w-80">
            <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-accent/30 to-primary/20 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                {personal.photo ? (
                    <AspectRatio ratio={4 / 4} className="w-full">
                        <Image
                        src={personal.photo}
                        alt={personal.name}
                        width={320}
                        height={320}
                        priority
                        className="object-cover"
                        />
                    </AspectRatio>
                ) : (
                    <div className="flex h-80 items-center justify-center bg-secondary text-8xl">
                        {personal.name.charAt(0)}
                    </div>
                )}
            </div>
            {/* Decorative corner accent */}
            <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full bg-accent/20 border border-accent/40" />
        </div>
      </TabsContent>

      <TabsContent value="terminal">
        {/* Fixed height so the terminal doesn't collapse */}
        <div className="h-95">
          <AboutTerminal portfolio={portfolio} locale={locale} />
        </div>
      </TabsContent>
    </Tabs>
  );
}