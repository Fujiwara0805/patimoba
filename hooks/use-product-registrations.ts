"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"

export interface ProductRegistration {
  id: string
  store_id: string
  name: string
  description: string
  price: number
  image: string | null
  cross_section_image: string | null
  product_type_id: string | null
  category_name: string | null
  always_available: boolean
  cur_same_day: boolean
  preparation_days: number
  order_start_date: string | null
  order_end_date: string | null
  is_ec: boolean
  max_per_day: number
  max_per_order: number
  shipping_type: string | null
  storage_type: string | null
  ingredients: string | null
  expiration_days: number | null
  volume: string | null
  sort_order: number
  accept_orders: boolean
  decoration: boolean
  created_date: string | null
  updated_at: string | null
}

interface UseProductRegistrationsOptions {
  storeId?: string
  ecOnly?: boolean
  publishedOnly?: boolean
}

function mapRow(row: any): ProductRegistration {
  const catName = row.product_types?.product_type ?? null
  return {
    id: row.id,
    store_id: row.store_id ?? "",
    name: row.name ?? "",
    description: row.description ?? "",
    price: row.price ?? 0,
    image: row.image ?? null,
    cross_section_image: row.cross_section_image ?? null,
    product_type_id: row.product_type_id ?? null,
    category_name: catName,
    always_available: row.always_available ?? true,
    cur_same_day: row.cur_same_day ?? false,
    preparation_days: row.preparation_days ?? 0,
    order_start_date: row.order_start_date ?? null,
    order_end_date: row.order_end_date ?? null,
    is_ec: row.is_ec ?? false,
    max_per_day: row.max_per_day ?? 30,
    max_per_order: row.max_per_order ?? 10,
    shipping_type: row.shipping_type ?? null,
    storage_type: row.storage_type ?? null,
    ingredients: row.ingredients ?? null,
    expiration_days: row.expiration_days ?? null,
    volume: row.volume ?? null,
    sort_order: row.sort_order ?? 0,
    accept_orders: row.accept_orders ?? true,
    decoration: row.decoration ?? false,
    created_date: row.created_date ?? null,
    updated_at: row.updated_at ?? null,
  }
}

export function useProductRegistrations(options: UseProductRegistrationsOptions = {}) {
  const [products, setProducts] = useState<ProductRegistration[]>([])
  const [categories, setCategories] = useState<string[]>(["すべて"])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    if (!options.storeId) {
      setProducts([])
      setCategories(["すべて"])
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)

    let query = supabase
      .from("product_registrations")
      .select("*, product_types(product_type)")
      .eq("store_id", options.storeId)
      .order("sort_order", { ascending: true })
      .order("created_date", { ascending: true })

    if (options.ecOnly === true) {
      query = query.eq("is_ec", true)
    } else if (options.ecOnly === false) {
      query = query.or("is_ec.is.null,is_ec.eq.false")
    }

    if (options.publishedOnly) {
      query = query.eq("accept_orders", true)
    }

    const { data, error: err } = await query
    if (err) {
      setError(err.message)
    } else {
      const categorySet = new Set<string>()
      const mapped = (data ?? []).map((row: any) => {
        const p = mapRow(row)
        if (p.category_name) categorySet.add(p.category_name)
        return p
      })
      setProducts(mapped)
      setCategories(["すべて", ...Array.from(categorySet)])
    }
    setLoading(false)
  }, [options.storeId, options.ecOnly, options.publishedOnly])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const updateProduct = async (
    id: string,
    updates: Partial<Omit<ProductRegistration, "id" | "store_id" | "category_name">>
  ) => {
    const payload: any = {}
    if (updates.name !== undefined) payload.name = updates.name
    if (updates.description !== undefined) payload.description = updates.description
    if (updates.price !== undefined) payload.price = updates.price
    if (updates.image !== undefined) payload.image = updates.image
    if (updates.cross_section_image !== undefined) payload.cross_section_image = updates.cross_section_image
    if (updates.product_type_id !== undefined) payload.product_type_id = updates.product_type_id
    if (updates.always_available !== undefined) payload.always_available = updates.always_available
    if (updates.cur_same_day !== undefined) payload.cur_same_day = updates.cur_same_day
    if (updates.preparation_days !== undefined) payload.preparation_days = updates.preparation_days
    if (updates.max_per_day !== undefined) payload.max_per_day = updates.max_per_day
    if (updates.max_per_order !== undefined) payload.max_per_order = updates.max_per_order
    if (updates.is_ec !== undefined) payload.is_ec = updates.is_ec
    if (updates.accept_orders !== undefined) payload.accept_orders = updates.accept_orders
    if (updates.decoration !== undefined) payload.decoration = updates.decoration
    if (updates.shipping_type !== undefined) payload.shipping_type = updates.shipping_type
    if (updates.storage_type !== undefined) payload.storage_type = updates.storage_type
    if (updates.ingredients !== undefined) payload.ingredients = updates.ingredients
    if (updates.expiration_days !== undefined) payload.expiration_days = updates.expiration_days
    if (updates.volume !== undefined) payload.volume = updates.volume
    if (updates.sort_order !== undefined) payload.sort_order = updates.sort_order
    if (updates.order_start_date !== undefined) payload.order_start_date = updates.order_start_date
    if (updates.order_end_date !== undefined) payload.order_end_date = updates.order_end_date

    const { error } = await supabase
      .from("product_registrations")
      .update(payload)
      .eq("id", id)

    if (!error) await fetchProducts()
    return { error: error?.message || null }
  }

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from("product_registrations")
      .delete()
      .eq("id", id)

    if (!error) await fetchProducts()
    return { error: error?.message || null }
  }

  return {
    products,
    categories,
    loading,
    error,
    refetch: fetchProducts,
    updateProduct,
    deleteProduct,
  }
}

export function useProductRegistration(id?: string) {
  const [product, setProduct] = useState<ProductRegistration | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setProduct(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)

    supabase
      .from("product_registrations")
      .select("*, product_types(product_type)")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message)
        } else if (data) {
          setProduct(mapRow(data))
        } else {
          setProduct(null)
        }
        setLoading(false)
      })
  }, [id])

  return { product, loading, error }
}
