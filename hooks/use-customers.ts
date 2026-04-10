"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Customer, toUICustomer } from "@/lib/types"

interface UseCustomersOptions {
  storeId?: number
}

export function useCustomers(options: UseCustomersOptions = {}) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomers = async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from("users")
      .select("*")
      .eq("user_type", "customer")
      .order("last_purchase_date", { ascending: false })

    if (options.storeId) {
      query = query.eq("store_id", options.storeId)
    }

    const { data, error: err } = await query
    if (err) {
      setError(err.message)
    } else {
      setCustomers((data || []).map(toUICustomer))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCustomers()
  }, [options.storeId])

  return { customers, loading, error, refetch: fetchCustomers }
}
