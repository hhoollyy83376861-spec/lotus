import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'מיכל א׳',
    text: 'המשי פשוט מרגיש כמו חלום על הראש. קיבלתי המון מחמאות והבד לא זז כל היום. איכות שלא הכרתי.',
  },
  {
    name: 'נעמה ל׳',
    text: 'סוף סוף מטפחות חלקות בגוונים שאני אוהבת, בלי הדפסים. השירות היה אישי וחם והמשלוח הגיע תוך יומיים.',
  },
  {
    name: 'שירה ב׳',
    text: 'קניתי את מטפחת הערב בזהב מט לאירוע וזה היה מושלם. אלגנטי, מחמיא ונוח. כבר הזמנתי עוד שתיים.',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-accent/40 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs tracking-[0.3em] text-gold">לקוחות מספרות</p>
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            אהבה מלקוחות בכל הארץ
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-7 shadow-sm"
            >
              <div className="mb-4 flex gap-0.5" aria-label="דירוג 5 מתוך 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-gold text-gold"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-pretty leading-relaxed text-foreground">
                {item.text}
              </blockquote>
              <figcaption className="mt-5 text-sm font-medium text-muted-foreground">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
