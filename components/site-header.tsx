'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/cart-provider'

const navLinks = [
  { href: '#collection', label: 'הקולקציה' },
  { href: '#testimonials', label: 'המלצות' },
  { href: '#gallery', label: 'גלריה' },
]

export function SiteHeader() {
  const { count, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <button
          type="button"
          onClick={openCart}
          aria-label={`עגלת קניות, ${count} פריטים`}
          className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
        >
          <ShoppingBag className="size-5" strokeWidth={1.5} />
          {count > 0 && (
            <span className="absolute -left-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-gold-foreground">
              {count}
            </span>
          )}
        </button>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="flex flex-col items-center leading-none">
          <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            לוֹטוּס
          </span>
          <span className="mt-1 text-[10px] tracking-[0.35em] text-muted-foreground">
            HEADWEAR
          </span>
        </a>
      </div>
    </header>
  )
}
