interface Stat {
  label: string
  value: string
  color: string
}

export function QuickStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-4">দ্রুত পরিসংখ্যান</h3>
      <div className="space-y-3">
        {stats.map(s => (
          <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
            <span className="text-sm text-foreground/80">{s.label}</span>
            <span className={`text-sm font-bold text-${s.color}-700 dark:text-${s.color}-300`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
