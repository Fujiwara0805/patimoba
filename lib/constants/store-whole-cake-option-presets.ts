/**
 * 店舗の「商品登録 > オプション」タブでタップ追加する定番オプション（ホール用イメージ）
 */
export interface StoreWholeCakeOptionPreset {
  name: string
  price: number
  multiple_allowed: boolean
}

export const STORE_WHOLE_CAKE_OPTION_PRESETS: StoreWholeCakeOptionPreset[] = [
  { name: "苺デコレーション", price: 0, multiple_allowed: false },
  { name: "チョコレートペン", price: 200, multiple_allowed: false },
  { name: "キャラクタープレート", price: 500, multiple_allowed: false },
  { name: "追加フルーツ", price: 300, multiple_allowed: true },
  { name: "生クリーム増量", price: 150, multiple_allowed: false },
  { name: "写真プリント（ケーキ台紙）", price: 800, multiple_allowed: false },
]
