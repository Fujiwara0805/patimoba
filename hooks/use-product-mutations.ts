"use client"

import { supabase } from "@/lib/supabase"

interface CreateProductInput {
  storeId: number
  name: string
  description: string
  price: number
  image?: string
  productTypeId: number
  maxPerOrder?: number
  maxPerDay?: number
  alwaysAvailable?: boolean
  curSameDay?: boolean
  preparationDays?: number
  isEc?: boolean
  decoration?: boolean
  orderStartDate?: string
  orderEndDate?: string
  ingredients?: string
  storageType?: string
  shippingType?: string
  expirationDays?: number
}

interface UpdateProductInput {
  name?: string
  description?: string
  price?: number
  image?: string
  productTypeId?: number
  maxPerOrder?: number
  maxPerDay?: number
  alwaysAvailable?: boolean
  curSameDay?: boolean
  preparationDays?: number
  isEc?: boolean
  orderStartDate?: string | null
  orderEndDate?: string | null
}

export function useProductMutations() {
  const createProduct = async (input: CreateProductInput) => {
    const { data, error } = await supabase
      .from("product_registrations")
      .insert({
        store_id: input.storeId,
        name: input.name,
        descriprion: input.description,
        price: input.price,
        image: input.image,
        product_type_id: input.productTypeId,
        max_per_order: input.maxPerOrder ?? 10,
        max_per_day: input.maxPerDay ?? 30,
        always_available: input.alwaysAvailable ?? true,
        cur_same_day: input.curSameDay ?? false,
        preparation_days: input.preparationDays ?? 0,
        is_ec: input.isEc ?? false,
        decoration: input.decoration ?? false,
        order_start_date: input.orderStartDate,
        order_end_date: input.orderEndDate,
        ingredients: input.ingredients,
        storage_type: input.storageType,
        shipping_type: input.shippingType,
        expiration_days: input.expirationDays,
        created_date: new Date().toISOString(),
      })
      .select("id")
      .single()

    return { productId: data ? Number(data.id) : 0, error: error?.message || null }
  }

  const updateProduct = async (productId: number, input: UpdateProductInput) => {
    const payload: any = {}
    if (input.name !== undefined) payload.name = input.name
    if (input.description !== undefined) payload.descriprion = input.description
    if (input.price !== undefined) payload.price = input.price
    if (input.image !== undefined) payload.image = input.image
    if (input.productTypeId !== undefined) payload.product_type_id = input.productTypeId
    if (input.maxPerOrder !== undefined) payload.max_per_order = input.maxPerOrder
    if (input.maxPerDay !== undefined) payload.max_per_day = input.maxPerDay
    if (input.alwaysAvailable !== undefined) payload.always_available = input.alwaysAvailable
    if (input.curSameDay !== undefined) payload.cur_same_day = input.curSameDay
    if (input.preparationDays !== undefined) payload.preparation_days = input.preparationDays
    if (input.isEc !== undefined) payload.is_ec = input.isEc
    if (input.orderStartDate !== undefined) payload.order_start_date = input.orderStartDate
    if (input.orderEndDate !== undefined) payload.order_end_date = input.orderEndDate

    const { error } = await supabase
      .from("product_registrations")
      .update(payload)
      .eq("id", productId)

    return { error: error?.message || null }
  }

  const toggleAcceptOrders = async (productId: number, accept: boolean) => {
    const { error } = await supabase
      .from("product_registrations")
      .update({ always_available: accept })
      .eq("id", productId)
    return { error: error?.message || null }
  }

  const toggleTodayAvailable = async (productId: number, available: boolean) => {
    const { error } = await supabase
      .from("product_registrations")
      .update({ cur_same_day: available })
      .eq("id", productId)
    return { error: error?.message || null }
  }

  const deleteProduct = async (productId: number) => {
    const { error } = await supabase
      .from("product_registrations")
      .delete()
      .eq("id", productId)
    return { error: error?.message || null }
  }

  return {
    createProduct,
    updateProduct,
    toggleAcceptOrders,
    toggleTodayAvailable,
    deleteProduct,
  }
}
