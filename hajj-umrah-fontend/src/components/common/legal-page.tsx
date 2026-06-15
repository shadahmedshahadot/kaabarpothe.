import { PageShell, PageHero } from '@/components/layouts/page-shell'

export interface LegalSection {
  heading: string
  body: string | string[]
}

interface Props {
  eyebrow: string
  title: string
  description: string
  effectiveDate: string
  sections: LegalSection[]
}

export function LegalPage({ eyebrow, title, description, effectiveDate, sections }: Props) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-10 border-b border-border pb-6">
            <strong className="text-foreground">কার্যকর তারিখ:</strong> {effectiveDate}<br />
            <strong className="text-foreground">সর্বশেষ আপডেট:</strong> {effectiveDate}
          </p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 flex items-start gap-3">
                  <span className="text-primary tabular-nums">{String(i + 1).padStart(2, '0')}.</span> {s.heading}
                </h2>
                {Array.isArray(s.body) ? (
                  <ul className="space-y-2 text-foreground/80 leading-relaxed">
                    {s.body.map((line, j) => <li key={j} className="pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary">{line}</li>)}
                  </ul>
                ) : (
                  <p className="text-foreground/80 leading-relaxed">{s.body}</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
