import * as React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { PRODUCTS } from '@/data/products'
import type { Product } from '@/types'

export type ProductSource = 'firestore' | 'fallback'

export interface UseProductsResult {
  products: Product[]
  loading: boolean
  source: ProductSource
}

/**
 * Reads the product catalogue from the Firestore `products` collection
 * (publicly readable per security rules). Falls back to the bundled catalogue
 * when the collection is empty or the read fails. The Firestore documents are
 * expected to match the Product shape once the backend seeds them.
 */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = React.useState<Product[]>(PRODUCTS)
  const [loading, setLoading] = React.useState(true)
  const [source, setSource] = React.useState<ProductSource>('fallback')

  React.useEffect(() => {
    let active = true

    getDocs(collection(db, 'products'))
      .then((snapshot) => {
        if (!active) {
          return
        }
        if (snapshot.empty) {
          setProducts(PRODUCTS)
          setSource('fallback')
          return
        }
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as Product
        )
        setProducts(docs)
        setSource('firestore')
      })
      .catch(() => {
        if (!active) {
          return
        }
        setProducts(PRODUCTS)
        setSource('fallback')
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return { products, loading, source }
}