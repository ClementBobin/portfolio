import { Suspense } from "react";
import {
  PageContent,
  type ProjectsPageProps,
} from "@/components/ui/projects/PageContent";
import { ProjectsFallback } from "@/components/ui/projects/ProjectsFallback";
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
