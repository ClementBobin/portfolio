import { PortfolioPageContent } from "@/components/ui/portfolio/PortfolioPageContent";

async function getPortfolioData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/portfolio`,
    { next: { revalidate: 3600 } },
  );
  return res.json();
}

interface Props {
  params: { locale: string };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  const data = await getPortfolioData();

  const cvUrl = process.env.NEXT_PUBLIC_CV_URL ?? "https://localhost:3000/cv/view";

  return <PortfolioPageContent data={data} locale={locale} cvUrl={cvUrl} />;
}
