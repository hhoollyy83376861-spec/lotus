'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/components/products-provider'
import { ProductForm } from '@/components/admin/product-form'
import { ProductRow } from '@/components/admin/product-row'

const ADMIN_PASSWORD = 'Lotus17!26'

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    if (value === ADMIN_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-card p-8 text-center">
        <div>
          <p className="mb-2 text-xs tracking-[0.3em] text-gold">לוֹטוּס</p>
          <h1 className="font-serif text-2xl font-semibold text-foreground">כניסת מנהלת</h1>
        </div>
        <div className="text-right">
          <label className="mb-1 block text-xs text-muted-foreground">סיסמה</label>
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
            autoFocus
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-center text-sm text-foreground outline-none focus:border-gold"
            placeholder="••••"
          />
          {error && <p className="mt-2 text-xs text-destructive">סיסמה שגויה, נסי שוב.</p>}
        </div>
        <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
          כניסה
        </Button>
      </form>
    </div>
  )
}

export function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(false)
  const { products, addProduct, updateProduct, removeProduct, resetProducts } = useProducts()

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold">לוֹטוּס</p>
            <h1 className="font-serif text-xl font-semibold text-foreground">ניהול מוצרים</h1>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">לצפייה בחנות</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-5 py-8 lg:grid-cols-[360px_1fr] lg:px-8">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ProductForm onSubmit={addProduct} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              מוצרים בקטלוג ({products.length})
            </h2>
            <Button variant="ghost" size="sm" onClick={resetProducts} className="text-muted-foreground">
              איפוס לברירת מחדל
            </Button>
          </div>

          {products.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
              עדיין אין מוצרים. הוסיפי מטפחת חדשה מהטופס.
            </p>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onSave={updateProduct}
                onDelete={removeProduct}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
