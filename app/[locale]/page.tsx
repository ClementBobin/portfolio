import { Suspense } from "react";
import { PortfolioPageContent, type PortfolioPageProps } from "@/components/ui/portfolio/PortfolioPageContent";
import { PortfolioFallback } from "@/components/ui/portfolio/PortfolioFallback";

export default function PortfolioPage({ params }: PortfolioPageProps) {
  return (
    <Suspense fallback={<PortfolioFallback />}>
      <PortfolioPageContent params={params} />
    </Suspense>
  );
}