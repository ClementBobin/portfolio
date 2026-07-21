"use server";

const VEILLE_FEED = "https://clementbobin.github.io/obsidian/index.xml";

export default async function VeillePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (

  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: t("veillePage.metaTitle") || "Veille Technologique",
    description:
      t("veillePage.metaDescription") ||
      "Tech watch — articles, tools and resources I follow.",
  };
}