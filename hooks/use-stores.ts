"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Store, toUIStore } from "@/lib/types"

interface UseStoresOptions {
  ecOnly?: boolean
}

export function useStores(options: UseStoresOptions = {}) {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStores = async () => {
    setLoading(true)
    setError(null)
    let query = supabase.from("stores").select("*")
    if (options.ecOnly) {
      query = query.eq("ec", true)
    }
    const { data, error: err } = await query
    if (err) {
      setError(err.message)
    } else {
      setStores((data || []).map(toUIStore))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStores()
  }, [options.ecOnly])

  return { stores, loading, error, refetch: fetchStores }
}
