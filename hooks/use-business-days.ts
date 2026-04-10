"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export interface BusinessDay {
  id: number
  businessDay: string
  customOpenDate: string | null
  customCloseDate: string | null
  isOpen: boolean
  storeId: number
}

export function useBusinessDays(storeId?: number) {
  const [businessDays, setBusinessDays] = useState<BusinessDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBusinessDays = async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from("business_day_settings")
      .select("*")
      .order("business_day", { ascending: true })

    if (storeId) {
      query = query.eq("store_id", storeId)
    }

    const { data, error: err } = await query
    if (err) {
      setError(err.message)
    } else {
      setBusinessDays(
        (data || []).map((row: any) => ({
          id: Number(row.id),
          businessDay: row.business_day || "",
          customOpenDate: row.custom_open_date,
          customCloseDate: row.custom_close_date,
          isOpen: row.is_open ?? true,
          storeId: Number(row.store_id),
        }))
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBusinessDays()
  }, [storeId])

  const addBusinessDay = async (day: Omit<BusinessDay, "id">) => {
    const { error: err } = await supabase.from("business_day_settings").insert({
      business_day: day.businessDay,
      custom_open_date: day.customOpenDate,
      custom_close_date: day.customCloseDate,
      is_open: day.isOpen,
      store_id: day.storeId,
    })
    if (err) throw err
    await fetchBusinessDays()
  }

  const updateBusinessDay = async (id: number, updates: Partial<BusinessDay>) => {
    const payload: any = {}
    if (updates.customOpenDate !== undefined) payload.custom_open_date = updates.customOpenDate
    if (updates.customCloseDate !== undefined) payload.custom_close_date = updates.customCloseDate
    if (updates.isOpen !== undefined) payload.is_open = updates.isOpen

    const { error: err } = await supabase
      .from("business_day_settings")
      .update(payload)
      .eq("id", id)
    if (err) throw err
    await fetchBusinessDays()
  }

  const deleteBusinessDay = async (id: number) => {
    const { error: err } = await supabase
      .from("business_day_settings")
      .delete()
      .eq("id", id)
    if (err) throw err
    await fetchBusinessDays()
  }

  return {
    businessDays,
    loading,
    error,
    refetch: fetchBusinessDays,
    addBusinessDay,
    updateBusinessDay,
    deleteBusinessDay,
  }
}
