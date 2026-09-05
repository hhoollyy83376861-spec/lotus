'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { products as seedProducts, type Product } from '@/lib/products'

const STORAGE_KEY = 'lotus:products:v1'

export type ProductInput = Omit<Product, 'id'>

type ProductsContextValue = {
  products: Product[]
  ready: boolean
  addProduct: (input: ProductInput) => void
  updateProduct: (id: string, input: Partial<ProductInput>) => void
  removeProduct: (id: string) => void
  resetProducts: () => void
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

function makeId() {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Product[]
        if (Array.isArray(parsed)) setProducts(parsed)
      }
    } catch {
      // ignore malformed storage, keep seed
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch {
      // storage may be full (large data-URL images) — fail silently
    }
  }, [products, ready])

  const addProduct = useCallback((input: ProductInput) => {
    setProducts((prev) => [{ ...input, id: makeId() }, ...prev])
  }, [])

  const updateProduct = useCallback((id: string, input: Partial<ProductInput>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...input } : p)),
    )
  }, [])

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const resetProducts = useCallback(() => {
    setProducts(seedProducts)
  }, [])

  const value = useMemo<ProductsContextValue>(
    () => ({ products, ready, addProduct, updateProduct, removeProduct, resetProducts }),
    [products, ready, addProduct, updateProduct, removeProduct, resetProducts],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
