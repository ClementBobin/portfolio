import { PortfolioPageContent } from "@/components/ui/portfolio/PortfolioPageContent";

async function getPortfolioData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/portfolio`
  );
  return res.json();
}

export default async function PortfolioPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const data = await getPortfolioData();
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL ?? "https://localhost:3000/cv/view";

  return <PortfolioPageContent data={data} locale={locale} cvUrl={cvUrl} />;
}