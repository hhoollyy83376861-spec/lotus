'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { formatILS, productSpec, type Product } from '@/lib/products'

const badgeStyles: Record<string, string> = {
  bestseller: 'bg-primary text-primary-foreground',
  recommended: 'bg-gold text-gold-foreground',
}

const badgeLabels: Record<string, string> = {
  bestseller: 'נמכר ביותר',
  recommended: 'מומלץ',
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={`${product.name} בגוון ${product.color}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold ${badgeStyles[product.badge]}`}
          >
            {badgeLabels[product.badge]}
          </span>
        )}
        <button
          type="button"
          onClick={() => addItem(product)}
          aria-label={`הוספת ${product.name} לסל`}
          className="absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur transition-all hover:bg-gold hover:text-gold-foreground"
        >
          <Plus className="size-5" strokeWidth={1.75} />
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-serif text-lg font-medium text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{productSpec}</p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            {formatILS(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-muted-foreground line-through">
              {formatILS(product.compareAt)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-4 inline-flex h-11 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.04] text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          הוספה לסל
        </button>
      </div>
    </article>
  )
}
