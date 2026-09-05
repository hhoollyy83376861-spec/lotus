import Image from 'next/image'
import { Camera } from 'lucide-react'
import { products } from '@/lib/products'

export function InstagramGallery() {
  const images = [
    '/products/hero.png',
    ...products.slice(0, 7).map((p) => p.image),
  ].slice(0, 6)

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs tracking-[0.3em] text-gold">גלריה</p>
        <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          לוֹטוּס באינסטגרם
        </h2>
        <a
          href="#top"
          className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Camera className="size-4" strokeWidth={1.5} />
          @lotus.headwear
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {images.map((src, i) => (
          <a
            key={i}
            href="#top"
            className="group relative aspect-square overflow-hidden rounded-xl bg-secondary"
          >
            <Image
              src={src || '/placeholder.svg'}
              alt="השראת סטיילינג של מטפחות לוֹטוּס"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 text-gold-foreground opacity-0 transition-all duration-300 group-hover:bg-foreground/30 group-hover:opacity-100">
              <Camera className="size-6" strokeWidth={1.5} />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
