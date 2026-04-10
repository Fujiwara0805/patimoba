"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Product, ManagedProduct, toUIProduct, toUIManagedProduct } from "@/lib/types"

interface UseProductsOptions {
  storeId?: number
  ecOnly?: boolean
  category?: string
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [managedProducts, setManagedProducts] = useState<ManagedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from("product_registrations")
      .select("*, product_types(product_type)")

    if (options.storeId) {
      query = query.eq("store_id", options.storeId)
    }
    if (options.ecOnly) {
      query = query.eq("is_ec", true)
    }

    const { data, error: err } = await query.order("id")
    if (err) {
      setError(err.message)
    } else {
      const rows = data || []
      setProducts(
        rows.map((row: any) =>
          toUIProduct(row, row.product_types?.product_type)
        )
      )
      setManagedProducts(
        rows.map((row: any) =>
          toUIManagedProduct(row, row.product_types?.product_type)
        )
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [options.storeId, options.ecOnly])

  return { products, managedProducts, loading, error, refetch: fetchProducts }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const { data, error: err } = await supabase
        .from("product_registrations")
        .select("*, product_types(product_type)")
        .eq("id", parseInt(id))
        .single()
      if (err) {
        setError(err.message)
      } else if (data) {
        setProduct(toUIProduct(data, (data as any).product_types?.product_type))
      }
      setLoading(false)
    }
    if (id) fetch()
  }, [id])

  return { product, loading, error }
}
