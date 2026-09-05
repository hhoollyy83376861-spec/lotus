'use client'

import { ProductCard } from '@/components/product-card'
import { useProducts } from '@/components/products-provider'
import { productSpec } from '@/lib/products'

export function ProductCatalog() {
  const { products } = useProducts()

  return (
    <section id="collection" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs tracking-[0.3em] text-gold">הקולקציה</p>
        <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          מטפחות סאטן חלקות
        </h2>
        <span className="mx-auto mt-4 block h-px w-12 bg-gold" />
        <p className="mt-4 text-sm text-muted-foreground">{productSpec}</p>
      </div>

      {products.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          אין מוצרים להצגה כרגע.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
