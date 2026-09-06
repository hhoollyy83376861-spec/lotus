'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import type { ProductInput } from '@/components/products-provider'
import type { Badge } from '@/lib/products'

type Props = {
  onSubmit: (input: ProductInput) => void
}

const SUPABASE_URL = 'https://qarkwbfqxdklhzyigbpg.supabase.co/rest/v1/products'
const SUPABASE_KEY = 'sb_publishable_uffXj1JpQqmPrOxd2daNNw_a01gzlpT'

const badgeOptions: { value: Exclude<Badge, null> | 'none'; label: string }[] = [
  { value: 'none', label: 'ללא תגית' },
  { value: 'bestseller', label: 'נמכר ביותר' },
  { value: 'recommended', label: 'מומלץ' },
]

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function ProductForm({ onSubmit }: Props) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [badge, setBadge] = useState<string>('none')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    setImage(dataUrl)
  }

  function reset() {
    setName('')
    setColor('')
    setPrice('')
    setBadge('none')
    setImage('')
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !price) return

    setLoading(true)

    const newProduct = {
      id: 'product-' + Date.now(),
      name: name.trim(),
      color: color.trim(),
      price: Number(price),
      image: image || '/products/silk-ivory.png',
      badge: badge === 'none' ? null : badge,
    }

    try {
      // שמירה ישירה ל-Supabase בענן
      await fetch(SUPABASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(newProduct),
      })
    } catch (err) {
      console.error('Error saving to Supabase:', err)
    }

    // עדכון מקומי של המסך
    onSubmit(newProduct)
    reset()
    setLoading(false)
  }

  const fieldClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-gold'

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6">
      <h2 className="font-serif text-xl font-semibold text-foreground">הוספת מטפחת חדשה (לשמירה בענן)</h2>

      <div className="flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image || "/placeholder.svg"} alt="תצוגה מקדימה" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
              תמונה
            </span>
          )}
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs text-muted-foreground">תמונת המוצר</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="block w-full text-xs text-muted-foreground file:ml-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs file:text-secondary-foreground"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-muted-foreground">שם המטפחת</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} placeholder="מטפחת סאטן — איוורי" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">צבע / גוון</label>
          <input value={color} onChange={(e) => setColor(e.target.value)} className={fieldClass} placeholder="איוורי" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">מחיר (₪)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
            inputMode="numeric"
            className={fieldClass}
            placeholder="149"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-muted-foreground">תגית</label>
        <select value={badge} onChange={(e) => setBadge(e.target.value)} className={fieldClass}>
          {badgeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-foreground text-background hover:bg-foreground/90">
        {loading ? 'שומר בענן...' : 'הוספה לקטלוג (לענן)'}
      </Button>
    </form>
  )
}
