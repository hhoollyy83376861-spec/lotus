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

const SUPABASE_URL = 'https://qarkwbfqxdklhzyigbpg.supabase.co/rest/v1/products'
const SUPABASE_KEY = 'sb_publishable_uffXj1JpQqmPrOxd2daNNw_a01gzlpT'

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [ready, setReady] = useState(false)

  // טעינת המוצרים מ-Supabase בעליית האתר
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(SUPABASE_URL, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          },
        })
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data)
          }
        }
      } catch (err) {
        console.error('Error fetching from Supabase:', err)
      } finally {
        setReady(true)
      }
    }
    fetchProducts()
  }, [])

  const addProduct = useCallback((input: ProductInput) => {
    const newProduct: Product = {
      ...input,
      id: 'p_' + Date.now().toString(36),
    }
    setProducts((prev) => [newProduct, ...prev])
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
