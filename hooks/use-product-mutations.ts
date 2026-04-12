"use client"

import { supabase } from "@/lib/supabase"

interface CreateProductInput {
  storeId: string
  name: string
  description: string
  price: number
  image?: string
  productTypeId?: string | null
  maxPerOrder?: number
  maxPerDay?: number
  acceptOrders?: boolean
  curSameDay?: boolean
  preparationDays?: number
  isEc?: boolean
  decoration?: boolean
  orderStartDate?: string | null
  orderEndDate?: string | null
  ingredients?: string
  storageType?: string | null
  shippingType?: string | null
  expirationDays?: number
  sortOrder?: number
  volume?: string
}

interface UpdateProductInput {
  name?: string
  description?: string
  price?: number
  image?: string
  productTypeId?: string | null
  maxPerOrder?: number
  maxPerDay?: number
  acceptOrders?: boolean
  curSameDay?: boolean
  preparationDays?: number
  isEc?: boolean
  decoration?: boolean
  orderStartDate?: string | null
  orderEndDate?: string | null
  ingredients?: string
  storageType?: string | null
  shippingType?: string | null
  expirationDays?: number
  sortOrder?: number
  volume?: string
}

export function useProductMutations() {
  const createProduct = async (input: CreateProductInput) => {
    const { data, error } = await supabase
      .from("product_registrations")
      .insert({
        store_id: input.storeId,
        name: input.name,
        description: input.description,
        price: input.price,
        image: input.image ?? "",
        product_type_id: input.productTypeId ?? null,
        max_per_order: input.maxPerOrder ?? 10,
        max_per_day: input.maxPerDay ?? 30,
        accept_orders: input.acceptOrders ?? true,
        cur_same_day: input.curSameDay ?? false,
        preparation_days: input.preparationDays ?? 0,
        is_ec: input.isEc ?? false,
        decoration: input.decoration ?? false,
        order_start_date: input.orderStartDate ?? null,
        order_end_date: input.orderEndDate ?? null,
        ingredients: input.ingredients ?? "",
        storage_type: input.storageType ?? "",
        shipping_type: input.shippingType ?? "",
        expiration_days: input.expirationDays ?? 0,
        sort_order: input.sortOrder ?? 0,
        volume: input.volume ?? "",
      })
      .select("id")
      .single()

    return { productId: data ? String(data.id) : "", error: error?.message || null }
  }

  const updateProduct = async (productId: string, input: UpdateProductInput) => {
    const payload: any = {}
    if (input.name !== undefined) payload.name = input.name
    if (input.description !== undefined) payload.description = input.description
    if (input.price !== undefined) payload.price = input.price
    if (input.image !== undefined) payload.image = input.image
    if (input.productTypeId !== undefined) payload.product_type_id = input.productTypeId
    if (input.maxPerOrder !== undefined) payload.max_per_order = input.maxPerOrder
    if (input.maxPerDay !== undefined) payload.max_per_day = input.maxPerDay
    if (input.acceptOrders !== undefined) payload.accept_orders = input.acceptOrders
    if (input.curSameDay !== undefined) payload.cur_same_day = input.curSameDay
    if (input.preparationDays !== undefined) payload.preparation_days = input.preparationDays
    if (input.isEc !== undefined) payload.is_ec = input.isEc
    if (input.decoration !== undefined) payload.decoration = input.decoration
    if (input.orderStartDate !== undefined) payload.order_start_date = input.orderStartDate
    if (input.orderEndDate !== undefined) payload.order_end_date = input.orderEndDate
    if (input.ingredients !== undefined) payload.ingredients = input.ingredients
    if (input.storageType !== undefined) payload.storage_type = input.storageType
    if (input.shippingType !== undefined) payload.shipping_type = input.shippingType
    if (input.expirationDays !== undefined) payload.expiration_days = input.expirationDays
    if (input.sortOrder !== undefined) payload.sort_order = input.sortOrder
    if (input.volume !== undefined) payload.volume = input.volume

    const { error } = await supabase
      .from("product_registrations")
      .update(payload)
      .eq("id", productId)

    return { error: error?.message || null }
  }

  const toggleAcceptOrders = async (productId: string, accept: boolean) => {
    const { error } = await supabase
      .from("product_registrations")
      .update({ accept_orders: accept })
      .eq("id", productId)
    return { error: error?.message || null }
  }

  const deleteProduct = async (productId: string) => {
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
    deleteProduct,
  }
}
