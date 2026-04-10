"use client"

import { supabase } from "@/lib/supabase"

interface CreateOrderInput {
  storeId: number
  userId: number
  paymentMethod: string
  subtotal: number
  sameDay: boolean
  pickupTime?: string
  visitDateTime?: string
  deliveryPreference?: boolean
  notes?: string
  usedPoints?: number
  couponAmount?: number
  items: { productId: number; quantity: number; totalAmount: number }[]
}

interface CreateOrderResult {
  orderId: number
  error: string | null
}

export function useOrderMutations() {
  const createOrder = async (input: CreateOrderInput): Promise<CreateOrderResult> => {
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        store_id: input.storeId,
        user_id: input.userId,
        payment_method: input.paymentMethod,
        subtotal: input.subtotal,
        same_day: input.sameDay,
        pickup_time: input.pickupTime,
        visit_date_time: input.visitDateTime,
        delivery_preference: input.deliveryPreference ?? false,
        notes: input.notes,
        used_points: input.usedPoints ?? 0,
        coupon_amount: input.couponAmount ?? 0,
        status: "received",
        preparing: false,
        order_confirmed: true,
        created_date: new Date().toISOString(),
      })
      .select("id")
      .single()

    if (orderErr || !order) {
      return { orderId: 0, error: orderErr?.message || "注文の作成に失敗しました" }
    }

    const lineItems = input.items.map((item) => ({
      parent_order_id: order.id,
      cake_type_id: item.productId,
      quantity: item.quantity,
      total_amount: item.totalAmount,
      user_id: input.userId,
      store_id: input.storeId,
      created_date: new Date().toISOString().split("T")[0],
    }))

    const { error: itemsErr } = await supabase.from("line_items").insert(lineItems)
    if (itemsErr) {
      return { orderId: Number(order.id), error: itemsErr.message }
    }

    return { orderId: Number(order.id), error: null }
  }

  const updateOrderStatus = async (orderId: number, preparing: boolean) => {
    const { error } = await supabase
      .from("orders")
      .update({
        preparing,
        order_completed_at: preparing ? new Date().toISOString() : null,
      })
      .eq("id", orderId)
    return { error: error?.message || null }
  }

  const deleteOrder = async (orderId: number) => {
    await supabase.from("line_items").delete().eq("parent_order_id", orderId)
    const { error } = await supabase.from("orders").delete().eq("id", orderId)
    return { error: error?.message || null }
  }

  return { createOrder, updateOrderStatus, deleteOrder }
}
