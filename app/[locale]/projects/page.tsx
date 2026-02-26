import { Suspense } from "react";
import { ProjectsFallback } from "@/components/ui/projects/ProjectsFallback";
import { PageContent, type ProjectsPageProps } from "@/components/ui/projects/PageContent";
/**
 * PageWrapper is a Server Component that wraps the main page in Suspense
 */
export default function PageWrapper({ params }: ProjectsPageProps) {
  return (
    <Suspense fallback={<ProjectsFallback />}>
      <PageContent params={params} />
    </Suspense>
  );
}