import type { Product } from '@/types'

export function formatProductPrice(product: Product): string {
  return `${product.price.toFixed(2)} ${product.currency}`
}

export function productDisplayCode(product: Product): string {
  return product.code ?? product.id
}