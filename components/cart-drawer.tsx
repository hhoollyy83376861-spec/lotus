'use client'

import Image from 'next/image'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { formatILS } from '@/lib/products'

const FREE_SHIPPING_THRESHOLD = 299

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    count,
    updateQuantity,
    removeItem,
  } = useCart()

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="עגלת קניות"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="flex items-center gap-2 font-serif text-xl font-medium text-foreground">
            <ShoppingBag className="size-5 text-gold" strokeWidth={1.5} />
            העגלה שלי
            <span className="text-sm font-normal text-muted-foreground">
              ({count})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="סגירת העגלה"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" strokeWidth={1} />
            <p className="text-muted-foreground">העגלה שלך ריקה כרגע</p>
            <button
              type="button"
              onClick={closeCart}
              className="inline-flex h-11 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground"
            >
              המשך לקנייה
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-6 py-3">
              {remaining > 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  נותרו {formatILS(remaining)} למשלוח חינם
                </p>
              ) : (
                <p className="text-center text-sm font-medium text-gold">
                  יש לך משלוח חינם! 🤍
                </p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-foreground">
                          {product.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {product.color}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`הסרת ${product.name}`}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="הפחתת כמות"
                          className="flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="הוספת כמות"
                          className="flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {formatILS(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-base">
                <span className="text-muted-foreground">סה״כ ביניים</span>
                <span className="font-serif text-xl font-semibold text-foreground">
                  {formatILS(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                דמי משלוח מחושבים במעבר לתשלום
              </p>
              <button
                type="button"
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
              >
                מעבר לתשלום
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
