export type Badge = 'bestseller' | 'recommended' | null

export type Product = {
  id: string
  name: string
  color: string
  price: number
  compareAt?: number
  image: string
  badge: Badge
}

// מפרט אחיד לכל המטפחות — סאטן איכותי, לא מחליקה, מידה 1×1 מ׳
export const productSpec = 'סאטן איכותי · 1×1 מ׳ · לא מחליקה'

// כרטיסי מוצר לדוגמה — החליפו שם, גוון, מחיר ותמונה במוצרים האמיתיים שלכן.
// כדי להעלות תמונה: שמרו אותה בתיקייה public/products והחליפו את הנתיב בשדה image.
export const products: Product[] = [
  {
    id: 'satin-ivory',
    name: 'מטפחת סאטן — איוורי',
    color: 'איוורי',
    price: 149,
    image: '/products/silk-ivory.png',
    badge: 'bestseller',
  },
  {
    id: 'satin-champagne',
    name: 'מטפחת סאטן — שמפניה',
    color: 'שמפניה',
    price: 149,
    image: '/products/silk-champagne.png',
    badge: 'recommended',
  },
  {
    id: 'satin-beige',
    name: 'מטפחת סאטן — בז׳',
    color: 'בז׳',
    price: 149,
    image: '/products/cotton-beige.png',
    badge: null,
  },
  {
    id: 'satin-rose',
    name: 'מטפחת סאטן — ורד עתיק',
    color: 'ורד עתיק',
    price: 149,
    image: '/products/cotton-rose.png',
    badge: null,
  },
  {
    id: 'satin-charcoal',
    name: 'מטפחת סאטן — פחם',
    color: 'פחם',
    price: 149,
    image: '/products/evening-charcoal.png',
    badge: 'recommended',
  },
  {
    id: 'satin-gold',
    name: 'מטפחת סאטן — זהב מט',
    color: 'זהב מט',
    price: 149,
    image: '/products/evening-gold.png',
    badge: 'bestseller',
  },
]

export function formatILS(amount: number): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(amount)
}
