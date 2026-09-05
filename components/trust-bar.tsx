import { Truck, Sparkles, HeartHandshake } from 'lucide-react'

const items = [
  { icon: Truck, label: 'משלוח מהיר עד הבית' },
  { icon: Sparkles, label: 'איכות בד פרימיום' },
  { icon: HeartHandshake, label: '100% שירות אישי' },
]

export function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-accent/40">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 py-6 text-center sm:grid-cols-3 lg:px-8">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 text-sm font-medium text-foreground"
          >
            <Icon className="size-5 text-gold" strokeWidth={1.5} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
