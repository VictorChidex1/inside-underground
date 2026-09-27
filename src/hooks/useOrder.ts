import * as React from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import type { Order } from '@/types'

export interface UseOrderResult {
  order: Order | null
  loading: boolean
  notFound: boolean
}

/**
 * Reads an order document from Firestore (orders are created server-side).
 */
export function useOrder(orderId: string | undefined): UseOrderResult {
  const [order, setOrder] = React.useState<Order | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [notFound, setNotFound] = React.useState(false)

  React.useEffect(() => {
    if (!orderId) {
      return
    }

    const orderDocRef = doc(db, 'orders', orderId)
    return onSnapshot(orderDocRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrder({ id: snapshot.id, ...snapshot.data() } as Order)
        setNotFound(false)
      } else {
        setOrder(null)
        setNotFound(true)
      }
      setLoading(false)
    })
  }, [orderId])

  const resolvedOrder = orderId ? order : null
  const resolvedLoading = orderId ? loading : false
  const resolvedNotFound = orderId ? notFound : true

  return { order: resolvedOrder, loading: resolvedLoading, notFound: resolvedNotFound }
}