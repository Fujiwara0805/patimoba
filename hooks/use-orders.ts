"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Order, toUIOrder } from "@/lib/types"

interface UseOrdersOptions {
  storeId?: number
  preparedOnly?: boolean
  unpreparedOnly?: boolean
  date?: string
}

export function useOrders(options: UseOrdersOptions = {}) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from("orders")
      .select(`
        *,
        users(id, line_name, last_name_kn, first_name_kn, phone_num, rank, gender),
        line_items(id, quantity, cake_type_id, total_amount, product_registrations:cake_type_id(name)),
        delivery_addresses(*)
      `)
      .order("created_date", { ascending: false })

    if (options.storeId) {
      query = query.eq("store_id", options.storeId)
    }
    if (options.preparedOnly) {
      query = query.eq("preparing", true)
    }
    if (options.unpreparedOnly) {
      query = query.eq("preparing", false)
    }

    const { data, error: err } = await query
    if (err) {
      setError(err.message)
    } else {
      setOrders((data || []).map(toUIOrder))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [options.storeId, options.preparedOnly, options.unpreparedOnly, options.date])

  return { orders, loading, error, refetch: fetchOrders }
}
