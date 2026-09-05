'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatILS, type Product, type Badge } from '@/lib/products'
import type { ProductInput } from '@/components/products-provider'

type Props = {
  product: Product
  onSave: (id: string, input: Partial<ProductInput>) => void
  onDelete: (id: string) => void
}

const badgeLabels: Record<string, string> = {
  bestseller: 'נמכר ביותר',
  recommended: 'מומלץ',
}

export function ProductRow({ product, onSave, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(product.name)
  const [color, setColor] = useState(product.color)
  const [price, setPrice] = useState(String(product.price))
  const [badge, setBadge] = useState<string>(product.badge ?? 'none')

  const fieldClass =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:border-gold'

  function save() {
    onSave(product.id, {
      name: name.trim(),
      color: color.trim(),
      price: Number(price) || 0,
      badge: badge === 'none' ? null : (badge as Badge),
    })
    setEditing(false)
  }

  function cancel() {
    setName(product.name)
    setColor(product.color)
    setPrice(String(product.price))
    setBadge(product.badge ?? 'none')
    setEditing(false)
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-3">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
      </div>

      {editing ? (
        <div className="grid flex-1 grid-cols-2 gap-2 lg:grid-cols-4">
          <input value={name} onChange={(e) => setName(e.target.value)} className={`${fieldClass} col-span-2`} />
          <input value={color} onChange={(e) => setColor(e.target.value)} className={fieldClass} placeholder="צבע" />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
            inputMode="numeric"
            className={fieldClass}
            placeholder="מחיר"
          />
          <select value={badge} onChange={(e) => setBadge(e.target.value)} className={`${fieldClass} col-span-2`}>
            <option value="none">ללא תגית</option>
            <option value="bestseller">נמכר ביותר</option>
            <option value="recommended">מומלץ</option>
          </select>
        </div>
      ) : (
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{product.name}</p>
          <p className="text-xs text-muted-foreground">
            {product.color && <span>{product.color} · </span>}
            {formatILS(product.price)}
            {product.badge && <span className="mr-2 text-gold">· {badgeLabels[product.badge]}</span>}
          </p>
        </div>
      )}

      <div className="flex shrink-0 gap-2">
        {editing ? (
          <>
            <Button size="sm" onClick={save} className="bg-foreground text-background hover:bg-foreground/90">
              שמירה
            </Button>
            <Button size="sm" variant="ghost" onClick={cancel}>
              ביטול
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
              עריכה
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(product.id)}
              className="text-destructive hover:text-destructive"
            >
              מחיקה
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
