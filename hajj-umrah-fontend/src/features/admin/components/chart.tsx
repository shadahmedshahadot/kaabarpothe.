'use client'

import { motion } from 'framer-motion'

interface Series { label: string; value: number; color?: string }

export function BarChart({ data, max }: { data: Series[]; max?: number }) {
  const peak = max ?? Math.max(...data.map(d => d.value))
  return (
    <div className="flex items-end justify-between gap-3 h-48">
      {data.map((d, i) => {
        const height = (d.value / peak) * 100
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-full flex items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full rounded-t-lg ${d.color ?? 'bg-gradient-to-t from-primary to-amber-400'} relative group`}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-0.5 rounded shadow border border-border whitespace-nowrap">
                  {d.value.toLocaleString()}
                </span>
              </motion.div>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium uppercase">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export function LineChart({ data, color = 'oklch(0.62 0.16 70)' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 600, h = 180, padding = 10
  const step = (w - padding * 2) / (data.length - 1)
  const points = data.map((v, i) => `${padding + i * step},${h - padding - ((v - min) / range) * (h - padding * 2)}`).join(' ')
  const area = `${padding},${h - padding} ${points} ${w - padding},${h - padding}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48">
      <defs>
        <linearGradient id="ln-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={area} fill="url(#ln-g)" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={padding + i * step} cy={h - padding - ((v - min) / range) * (h - padding * 2)} r="3.5" fill={color} className="opacity-0 hover:opacity-100" />
      ))}
    </svg>
  )
}

export function DonutChart({ data }: { data: Series[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  let offset = 0
  const radius = 50
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="oklch(0.93 0.008 70)" strokeWidth="14" />
        {data.map((d, i) => {
          const len = (d.value / total) * circumference
          const el = (
            <motion.circle
              key={d.label}
              cx="60" cy="60" r={radius} fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              whileInView={{ strokeDasharray: `${len} ${circumference}` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
          )
          offset += len
          return el
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-foreground">{total.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">মোট</p>
      </div>
    </div>
  )
}
