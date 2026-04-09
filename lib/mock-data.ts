export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isLimited: boolean;
  limitedUntil?: string;
  maxQuantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  lineName: string;
  customerAvatar?: string;
  phone: string;
  orderDate: string;
  visitTime: string;
  pickupDate: string;
  items: { name: string; quantity: number }[];
  total: number;
  shippingIncluded: boolean;
  paymentStatus: "決済済み" | "銀行振込" | "店頭支払い" | "未払い";
  isPrepared: boolean;
  address?: string;
  pickupTimeSlot?: string;
}

export interface Customer {
  id: string;
  name: string;
  avatar?: string;
  rank: "Bronze" | "Silver" | "Gold" | "Platinum";
  gender: "男性" | "女性" | "その他";
  phone: string;
  lastVisit: string;
}

export interface CandleOption {
  id: string;
  name: string;
  price: number;
}

export interface WholeCakeSize {
  id: string;
  label: string;
  servings: string;
  price: number;
}

export interface WholeCakeOption {
  id: string;
  name: string;
  price: number;
}

export interface WholeCakeProduct {
  id: string;
  name: string;
  image: string;
  sizes: WholeCakeSize[];
  options: WholeCakeOption[];
}

export interface Store {
  id: string;
  name: string;
  address: string;
  image: string;
}

export const mockStores: Store[] = [
  {
    id: "1",
    name: "Patisserie KANATA",
    address: "東京都渋谷区神宮前3-1-1",
    image: "https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    name: "Patisserie Lumiere",
    address: "東京都目黒区自由が丘1-2-3",
    image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "さくらロール",
    price: 620,
    image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "期間限定",
    description: "春を感じる、やさしい甘さのロールケーキ。\nふんわりスポンジに桜風味のクリームをたっぷり巻き込みました。\n桜の香りが、心まで春色に染めてくれます。",
    isLimited: true,
    limitedUntil: "4月30日",
    maxQuantity: 5,
  },
  {
    id: "2",
    name: "ブルーベリーレアチーズ",
    price: 620,
    image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "生菓子",
    description: "濃厚なレアチーズケーキにフレッシュブルーベリーソースを添えて。\nなめらかな口どけと爽やかな酸味のハーモニーをお楽しみください。",
    isLimited: false,
    maxQuantity: 5,
  },
  {
    id: "3",
    name: "ピスターシュショコラ",
    price: 680,
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "生菓子",
    description: "ピスタチオの芳醇な香りとビターチョコレートのマリアージュ。\n上品な味わいが口いっぱいに広がります。",
    isLimited: false,
    maxQuantity: 5,
  },
  {
    id: "4",
    name: "ショートケーキ",
    price: 700,
    image: "https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "生菓子",
    description: "定番のいちごショートケーキ。\nふわふわスポンジと生クリーム、甘酸っぱいいちごの王道の組み合わせ。",
    isLimited: false,
    maxQuantity: 5,
  },
  {
    id: "5",
    name: "ガトーショコラ",
    price: 3200,
    image: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "ホール",
    description: "濃厚なチョコレートを贅沢に使用したガトーショコラ。\n特別な日にぴったりのホールケーキです。",
    isLimited: false,
    maxQuantity: 3,
  },
  {
    id: "6",
    name: "フィナンシェ詰め合わせ",
    price: 2400,
    image: "https://images.pexels.com/photos/3992134/pexels-photo-3992134.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "焼き菓子",
    description: "バターの香り豊かなフィナンシェの詰め合わせセット。\nプレーン、抹茶、ショコラの3種類をお楽しみいただけます。",
    isLimited: false,
    maxQuantity: 10,
  },
  {
    id: "7",
    name: "マカロンセット",
    price: 1800,
    image: "https://images.pexels.com/photos/1855135/pexels-photo-1855135.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "焼き菓子",
    description: "色とりどりのマカロン6個セット。\nバニラ、ローズ、ピスタチオ、ショコラ、フランボワーズ、キャラメルの6種。",
    isLimited: false,
    maxQuantity: 10,
  },
  {
    id: "8",
    name: "季節のフルーツタルト",
    price: 750,
    image: "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "期間限定",
    description: "旬のフルーツをふんだんに使った季節限定タルト。\nサクサクのタルト生地とカスタードクリームが絶妙です。",
    isLimited: true,
    limitedUntil: "5月15日",
    maxQuantity: 5,
  },
  {
    id: "9",
    name: "ドバイチョコ餅",
    price: 980,
    image: "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "その他",
    description: "話題のドバイチョコレートを使用した和洋折衷スイーツ。\nもちもちの餅生地に濃厚チョコレートを包みました。",
    isLimited: false,
    maxQuantity: 5,
  },
  {
    id: "10",
    name: "アイスコーヒー",
    price: 450,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "ドリンク",
    description: "スペシャルティコーヒー豆を使用したアイスコーヒー。\nケーキとの相性抜群です。",
    isLimited: false,
    maxQuantity: 5,
  },
];

export const mockOrders: Order[] = [
  {
    id: "1",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2026年 3月 30日 19:00",
    visitTime: "4/11/14:00",
    pickupDate: "2026年 4月 11日 14:00",
    items: [
      { name: "ショートケーキ", quantity: 1 },
      { name: "マフィン", quantity: 1 },
    ],
    total: 1050,
    shippingIncluded: false,
    paymentStatus: "店頭支払い",
    isPrepared: false,
  },
  {
    id: "2",
    customerName: "アい",
    lineName: "アい",
    phone: "09012345678",
    orderDate: "2026年 3月 28日 10:00",
    visitTime: "",
    pickupDate: "",
    items: [
      { name: "ドバイチョコ餅", quantity: 1 },
      { name: "焼き菓子セット", quantity: 5 },
    ],
    total: 19580,
    shippingIncluded: true,
    paymentStatus: "銀行振込",
    isPrepared: false,
    address: "〒8797411大分県豊後大野市千歳町柴山1494-1",
    pickupTimeSlot: "夜（19:00〜21:00）",
  },
  {
    id: "h1",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2025年 9月 7日 1:33",
    visitTime: "9/7/11:30",
    pickupDate: "2025年 9月 7日 11:30",
    items: [{ name: "チョコレートケーキ", quantity: 1 }],
    total: 650,
    shippingIncluded: false,
    paymentStatus: "決済済み",
    isPrepared: true,
  },
  {
    id: "h2",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2025年 9月 6日 15:00",
    visitTime: "9/7/12:00",
    pickupDate: "2025年 9月 7日 12:00",
    items: [{ name: "抹茶ケーキ", quantity: 1 }],
    total: 600,
    shippingIncluded: false,
    paymentStatus: "決済済み",
    isPrepared: true,
  },
  {
    id: "h3",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2025年 9月 5日 10:00",
    visitTime: "9/7/15:00",
    pickupDate: "2025年 9月 7日 15:00",
    items: [
      { name: "ショートケーキ", quantity: 3 },
      { name: "チーズケーキ", quantity: 2 },
    ],
    total: 3000,
    shippingIncluded: false,
    paymentStatus: "決済済み",
    isPrepared: true,
  },
  {
    id: "h4",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2025年 10月 1日 8:00",
    visitTime: "10/2/10:00",
    pickupDate: "2025年 10月 2日 10:00",
    items: [
      { name: "チョコレートケーキ", quantity: 5 },
      { name: "チーズケーキtesutotesutotest", quantity: 1 },
    ],
    total: 3550,
    shippingIncluded: false,
    paymentStatus: "決済済み",
    isPrepared: true,
  },
  {
    id: "h5",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2025年 12月 4日 9:32",
    visitTime: "12/5/12:30",
    pickupDate: "2025年 12月 5日 12:30",
    items: [
      { name: "焼き菓子セット", quantity: 3 },
      { name: "チョコレートケーキ", quantity: 1 },
    ],
    total: 10850,
    shippingIncluded: false,
    paymentStatus: "決済済み",
    isPrepared: true,
  },
  {
    id: "h6",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2025年 12月 5日 10:00",
    visitTime: "12/6/13:00",
    pickupDate: "2025年 12月 6日 13:00",
    items: [{ name: "ショートケーキ", quantity: 1 }],
    total: 700,
    shippingIncluded: false,
    paymentStatus: "決済済み",
    isPrepared: true,
  },
  {
    id: "h7",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2026年 2月 6日 12:00",
    visitTime: "2/7/15:00",
    pickupDate: "2026年 2月 7日 15:00",
    items: [{ name: "チーズケーキ", quantity: 1 }],
    total: 600,
    shippingIncluded: false,
    paymentStatus: "店頭支払い",
    isPrepared: true,
  },
  {
    id: "h8",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2026年 3月 29日 14:00",
    visitTime: "3/30/16:30",
    pickupDate: "2026年 3月 30日 16:30",
    items: [{ name: "ショートケーキ", quantity: 1 }],
    total: 700,
    shippingIncluded: false,
    paymentStatus: "決済済み",
    isPrepared: true,
  },
  {
    id: "h9",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2026年 3月 25日 10:00",
    visitTime: "",
    pickupDate: "",
    items: [{ name: "焼き菓子セット", quantity: 1 }],
    total: 5000,
    shippingIncluded: true,
    paymentStatus: "決済済み",
    isPrepared: true,
    address: "〒8797411\n大分県豊後大野市千歳町柴山1494-1",
    pickupTimeSlot: "時間指定：",
  },
  {
    id: "h10",
    customerName: "カンダジョウ",
    lineName: "じょう",
    phone: "00000000000",
    orderDate: "2026年 3月 20日 9:00",
    visitTime: "",
    pickupDate: "",
    items: [
      { name: "焼き菓子セット", quantity: 1 },
      { name: "スペシャル焼き菓子セット", quantity: 1 },
    ],
    total: 9500,
    shippingIncluded: true,
    paymentStatus: "決済済み",
    isPrepared: true,
    address: "〒8797411\n大分県豊後大野市千歳町柴山1494-1",
    pickupTimeSlot: "午後（14:00〜16:00）",
  },
];

export const mockCustomers: Customer[] = [
  { id: "1", name: "一郎", rank: "Bronze", gender: "男性", phone: "00012345678", lastVisit: "2000/4/1" },
  { id: "2", name: "二郎", rank: "Bronze", gender: "男性", phone: "0001234567", lastVisit: "2000/4/2" },
  { id: "3", name: "もりたゆうと", avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40", rank: "Bronze", gender: "男性", phone: "08083870137", lastVisit: "2025/3/20" },
  { id: "4", name: "美咲", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40", rank: "Bronze", gender: "女性", phone: "09062501396", lastVisit: "2025/4/22" },
  { id: "5", name: "神田まゆみ", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40", rank: "Bronze", gender: "女性", phone: "09071583415", lastVisit: "2025/9/2" },
  { id: "6", name: "佐藤 さくら", rank: "Silver", gender: "女性", phone: "00000000000", lastVisit: "2025/9/3" },
  { id: "7", name: "TAKU", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40", rank: "Bronze", gender: "その他", phone: "09095866319", lastVisit: "2025/9/4" },
  { id: "8", name: "ゆーま", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40", rank: "Bronze", gender: "その他", phone: "1", lastVisit: "2025/12/19" },
  { id: "9", name: "あんどう", avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=40", rank: "Bronze", gender: "男性", phone: "08027079953", lastVisit: "2025/12/25" },
  { id: "10", name: "ひなた", rank: "Bronze", gender: "女性", phone: "09012345678", lastVisit: "2026/1/15" },
];

export const mockCandleOptions: CandleOption[] = [
  { id: "1", name: "ナンバーキャンドル", price: 150 },
  { id: "2", name: "ノーマルキャンドル(大)", price: 0 },
  { id: "3", name: "ノーマルキャンドル(小)", price: 0 },
];

export const mockWholeCakes: WholeCakeProduct[] = [
  {
    id: "wc1",
    name: "生クリームデコレーション",
    image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=100",
    sizes: [
      { id: "s5", label: "5号", servings: "4~6名分", price: 4600 },
      { id: "s6", label: "6号", servings: "6~8名分", price: 5800 },
    ],
    options: [
      { id: "op1", name: "苺アップ\u2460", price: 1000 },
      { id: "op2", name: "苺アップ\u2461", price: 2000 },
      { id: "op3", name: "苺アップ\u2462", price: 3000 },
      { id: "op4", name: "苺アップ\u2463", price: 4000 },
      { id: "op5", name: "苺アップ\u2464", price: 5000 },
      { id: "op6", name: "プレート追加(ホワイトチョコ)", price: 200 },
    ],
  },
  {
    id: "wc2",
    name: "チョコレートデコレーション",
    image: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=100",
    sizes: [
      { id: "s5", label: "5号", servings: "4~6名分", price: 4800 },
      { id: "s6", label: "6号", servings: "6~8名分", price: 6000 },
    ],
    options: [
      { id: "op1", name: "苺アップ\u2460", price: 1000 },
      { id: "op2", name: "苺アップ\u2461", price: 2000 },
      { id: "op3", name: "苺アップ\u2462", price: 3000 },
      { id: "op4", name: "苺アップ\u2463", price: 4000 },
      { id: "op5", name: "苺アップ\u2464", price: 5000 },
      { id: "op6", name: "プレート追加(ホワイトチョコ)", price: 200 },
    ],
  },
];

export const productCategories = [
  "すべて",
  "期間限定",
  "生菓子",
  "ホール",
  "焼き菓子",
  "ドリンク",
  "その他",
];
