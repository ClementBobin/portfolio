interface ModalSectionProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Renders a labelled content block inside the contribution modal.
 *
 * @param label    - Section heading displayed in monospace uppercase.
 * @param children - Section body content.
 */
export default async function ModalSection({ label, children }: ModalSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">
        {label}
      </p>
      {children}
    </div>
  );
}