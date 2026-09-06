import Image from 'next/image'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div className="order-2 text-center lg:order-1 lg:text-right">
          <p className="mb-5 text-xs tracking-[0.3em] text-gold">
            מטפחות סאטן · לא מחליקות
          </p>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl lg:text-6xl">
            קולקציית
            <span className="mt-2 block text-3xl text-muted-foreground sm:text-4xl lg:text-5xl">
              המטפחות החלקות
            </span>
          </h1>
          <div className="mt-9 flex justify-center lg:justify-start">
            <a
              href="#collection"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-9 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              לקולקציה החדשה
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-secondary shadow-[0_30px_80px_-40px_rgba(80,60,40,0.5)]">
            <Image
              src="/products/לוגו.png"
              alt="אישה עוטה מטפחת משי חלקה בגוון שמנת, עיצוב יוקרתי ואלגנטי"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
