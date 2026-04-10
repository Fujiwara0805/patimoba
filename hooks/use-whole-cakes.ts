"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import {
  WholeCakeProduct,
  CandleOption,
  toUICandleOption,
  toUIWholeCakeSize,
  toUIWholeCakeOption,
} from "@/lib/types"

export function useWholeCakes(storeId?: number) {
  const [wholeCakes, setWholeCakes] = useState<WholeCakeProduct[]>([])
  const [candleOptions, setCandleOptions] = useState<CandleOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWholeCakes = async () => {
    setLoading(true)
    setError(null)

    try {
      let productQuery = supabase
        .from("product_registrations")
        .select("*, product_types(product_type)")
        .eq("decoration", true)

      if (storeId) productQuery = productQuery.eq("store_id", storeId)

      const { data: products, error: prodErr } = await productQuery
      if (prodErr) throw prodErr

      const cakes: WholeCakeProduct[] = []

      for (const product of products || []) {
        const [sizesResult, optionsResult] = await Promise.all([
          supabase
            .from("customized_cake_sizes")
            .select("*")
            .eq("store_id", product.store_id!),
          supabase
            .from("customized_cake_options")
            .select("*")
            .eq("product_id", product.id),
        ])

        cakes.push({
          id: String(product.id),
          name: product.name || "",
          image: product.image || "",
          sizes: (sizesResult.data || []).map(toUIWholeCakeSize),
          options: (optionsResult.data || []).map(toUIWholeCakeOption),
        })
      }

      setWholeCakes(cakes)

      let candleQuery = supabase.from("customized_cake_candles").select("*")
      if (storeId) candleQuery = candleQuery.eq("store_id", storeId)

      const { data: candles, error: candleErr } = await candleQuery
      if (candleErr) throw candleErr
      setCandleOptions((candles || []).map(toUICandleOption))
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchWholeCakes()
  }, [storeId])

  return { wholeCakes, candleOptions, loading, error, refetch: fetchWholeCakes }
}
