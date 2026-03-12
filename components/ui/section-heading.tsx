interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-2 mb-10">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground px-1">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
      </div>
      {subtitle && (
        <p className="text-center text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
