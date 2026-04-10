// UI型定義（既存のmock-data.tsから移行）
export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  isLimited: boolean
  limitedUntil?: string
  maxQuantity: number
}

export interface ManagedProduct {
  id: string
  name: string
  image: string
  description: string
  price: string
  acceptOrders: boolean
  todayAvailable: boolean
  dailyMax: number
  prepDays: number
  category: string
  maxPerOrder: number
}

export interface Order {
  id: string
  customerName: string
  lineName: string
  customerAvatar?: string
  phone: string
  orderDate: string
  visitTime: string
  pickupDate: string
  items: { name: string; quantity: number }[]
  total: number
  shippingIncluded: boolean
  paymentStatus: "決済済み" | "銀行振込" | "店頭支払い" | "未払い"
  isPrepared: boolean
  address?: string
  pickupTimeSlot?: string
}

export interface Customer {
  id: string
  name: string
  avatar?: string
  rank: "Bronze" | "Silver" | "Gold" | "Platinum"
  gender: "男性" | "女性" | "その他"
  phone: string
  lastVisit: string
}

export interface Store {
  id: string
  name: string
  address: string
  image: string
}

export interface CandleOption {
  id: string
  name: string
  price: number
}

export interface WholeCakeSize {
  id: string
  label: string
  servings: string
  price: number
}

export interface WholeCakeOption {
  id: string
  name: string
  price: number
}

export interface WholeCakeProduct {
  id: string
  name: string
  image: string
  sizes: WholeCakeSize[]
  options: WholeCakeOption[]
}

// DB → UI 変換関数

export function toUIStore(row: any): Store {
  return {
    id: String(row.id),
    name: row.name || "",
    address: row.address_url || "",
    image: row.image || "",
  }
}

export function toUIProduct(row: any, productType?: string): Product {
  const now = new Date()
  const isLimited =
    row.order_start_date != null &&
    row.order_end_date != null &&
    new Date(row.order_end_date) > now
  const limitedUntil = row.order_end_date
    ? new Date(row.order_end_date).toLocaleDateString("ja-JP", { month: "long", day: "numeric" })
    : undefined

  return {
    id: String(row.id),
    name: row.name || "",
    price: Number(row.price) || 0,
    image: row.image || "",
    category: productType || "その他",
    description: row.description || row.descriprion || "",
    isLimited,
    limitedUntil,
    maxQuantity: Number(row.max_per_order) || 5,
  }
}

export function toUIManagedProduct(row: any, productType?: string): ManagedProduct {
  const price = Number(row.price) || 0
  return {
    id: String(row.id),
    name: row.name || "",
    image: row.image || "",
    description: row.description || row.descriprion || "",
    price: price > 0 ? `¥${price.toLocaleString()}` : "",
    acceptOrders: row.always_available ?? false,
    todayAvailable: row.cur_same_day ?? false,
    dailyMax: Number(row.max_per_day) || 30,
    prepDays: Number(row.preparation_days) || 0,
    category: productType || "その他",
    maxPerOrder: Number(row.max_per_order) || 10,
  }
}

export function toUIOrder(row: any): Order {
  const createdDate = row.created_date ? new Date(row.created_date) : new Date()
  const visitDate = row.visit_date_time ? new Date(row.visit_date_time) : null
  const pickupTime = row.pickup_time ? new Date(row.pickup_time) : null

  const formatDate = (d: Date) =>
    `${d.getFullYear()}年 ${d.getMonth() + 1}月 ${d.getDate()}日 ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`

  const formatVisitTime = (d: Date) =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`

  const items: { name: string; quantity: number }[] = (row.line_items || []).map((li: any) => ({
    name: li.product_registrations?.name || li.product_name || "不明",
    quantity: Number(li.quantity) || 1,
  }))

  const user = row.users || {}
  const deliveryAddr = row.delivery_addresses || null

  let paymentStatus: Order["paymentStatus"] = "未払い"
  if (row.payment_method === "credit_card" || row.payment_method === "決済済み") {
    paymentStatus = "決済済み"
  } else if (row.payment_method === "bank_transfer" || row.payment_method === "銀行振込") {
    paymentStatus = "銀行振込"
  } else if (row.payment_method === "store" || row.payment_method === "店頭支払い") {
    paymentStatus = "店頭支払い"
  }

  return {
    id: String(row.id),
    customerName: user.last_name_kn
      ? `${user.last_name_kn}${user.first_name_kn || ""}`
      : user.line_name || "",
    lineName: user.line_name || "",
    customerAvatar: undefined,
    phone: user.phone_num || "",
    orderDate: formatDate(createdDate),
    visitTime: visitDate ? formatVisitTime(visitDate) : "",
    pickupDate: pickupTime ? formatDate(pickupTime) : visitDate ? formatDate(visitDate) : "",
    items,
    total: Number(row.subtotal) || 0,
    shippingIncluded: row.delivery_preference ?? false,
    paymentStatus,
    isPrepared: row.preparing ?? false,
    address: deliveryAddr
      ? `〒${deliveryAddr.zip_code || ""}\n${deliveryAddr.address || ""}${deliveryAddr.street_num || ""}${deliveryAddr.building || ""}`
      : undefined,
    pickupTimeSlot: undefined,
  }
}

export function toUICustomer(row: any): Customer {
  const lastPurchase = row.last_purchase_date
    ? new Date(row.last_purchase_date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).replace(/\//g, "/")
    : ""

  return {
    id: String(row.id),
    name: row.line_name || `${row.last_name_kn || ""}${row.first_name_kn || ""}`,
    avatar: undefined,
    rank: (row.rank as Customer["rank"]) || "Bronze",
    gender: (row.gender as Customer["gender"]) || "その他",
    phone: row.phone_num || "",
    lastVisit: lastPurchase,
  }
}

export function toUICandleOption(row: any): CandleOption {
  return {
    id: String(row.id),
    name: row.types_of_candles || "",
    price: Number(row.price_per_candle) || 0,
  }
}

export function toUIWholeCakeSize(row: any): WholeCakeSize {
  return {
    id: String(row.id),
    label: row.cake_size || "",
    servings: "",
    price: Number(row.size_price) || 0,
  }
}

export function toUIWholeCakeOption(row: any): WholeCakeOption {
  return {
    id: String(row.id),
    name: row.option_name || "",
    price: Number(row.option_price) || 0,
  }
}
