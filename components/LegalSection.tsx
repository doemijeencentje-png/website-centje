export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-neutral-900 mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-neutral-600 leading-relaxed">{children}</div>
    </section>
  );
}
