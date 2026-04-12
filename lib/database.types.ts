export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          auth_user_id: string
          company_name: string | null
          created_at: string | null
          department: string | null
          email: string
          id: string
          name: string
          notification_settings: Json | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id: string
          company_name?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          id?: string
          name?: string
          notification_settings?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string
          company_name?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          id?: string
          name?: string
          notification_settings?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      business_day_schedules: {
        Row: {
          close_time: string | null
          created_at: string | null
          created_by: string | null
          date: string
          id: string
          is_open: boolean
          open_time: string | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          close_time?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          id?: string
          is_open?: boolean
          open_time?: string | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          close_time?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          is_open?: boolean
          open_time?: string | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bds_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_day_schedules_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      candle_options: {
        Row: {
          created_at: string | null
          id: string
          name: string
          price: number
          sort_order: number | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string
          price?: number
          sort_order?: number | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          price?: number
          sort_order?: number | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candle_options_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "co_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      closed_day_rules: {
        Row: {
          created_at: string | null
          day_of_week: number
          id: string
          rule: string
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          id?: string
          rule?: string
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          id?: string
          rule?: string
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cdr_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "closed_day_rules_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          created_at: string | null
          created_by: string | null
          discount_price: number
          id: string
          name: string
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          discount_price?: number
          id?: string
          name?: string
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          discount_price?: number
          id?: string
          name?: string
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_anniversaries: {
        Row: {
          created_at: string | null
          customer_id: string
          day: number
          id: string
          label: string
          month: number
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          day: number
          id?: string
          label?: string
          month: number
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          day?: number
          id?: string
          label?: string
          month?: number
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ca_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ca_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_anniversaries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_anniversaries_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_coupons: {
        Row: {
          coupon_id: string
          created_at: string | null
          customer_id: string
          id: string
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          coupon_id: string
          created_at?: string | null
          customer_id: string
          id?: string
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          coupon_id?: string
          created_at?: string | null
          customer_id?: string
          id?: string
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cc_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cc_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_coupons_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_coupons_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_store_relationships: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          last_visit: string | null
          points_balance: number | null
          rank: string | null
          store_id: string
          store_note: string | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          last_visit?: string | null
          points_balance?: number | null
          rank?: string | null
          store_id: string
          store_note?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          last_visit?: string | null
          points_balance?: number | null
          rank?: string | null
          store_id?: string
          store_note?: string | null
          total_orders?: number | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "csr_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "csr_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_store_relationships_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_store_relationships_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          allergies: string[] | null
          auth_user_id: string | null
          avatar: string | null
          birth_day: number | null
          birth_month: number | null
          birth_year: number | null
          building: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          first_name: string | null
          first_name_kn: string | null
          gender: string | null
          id: string
          last_name: string | null
          last_name_kn: string | null
          line_name: string | null
          line_user_id: string | null
          phone: string | null
          postal_code: string | null
          store_note: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          auth_user_id?: string | null
          avatar?: string | null
          birth_day?: number | null
          birth_month?: number | null
          birth_year?: number | null
          building?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          first_name_kn?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          last_name_kn?: string | null
          line_name?: string | null
          line_user_id?: string | null
          phone?: string | null
          postal_code?: string | null
          store_note?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          auth_user_id?: string | null
          avatar?: string | null
          birth_day?: number | null
          birth_month?: number | null
          birth_year?: number | null
          building?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          first_name_kn?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          last_name_kn?: string | null
          line_name?: string | null
          line_user_id?: string | null
          phone?: string | null
          postal_code?: string | null
          store_note?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_customer_info: {
        Row: {
          address: string | null
          building: string | null
          card_id: string | null
          created_at: string | null
          customer_id: string | null
          email: string | null
          first_name_kj: string | null
          first_name_kn: string | null
          id: string
          last_name_kj: string | null
          last_name_kn: string | null
          order_id: string | null
          phone: string | null
          postal_code: string | null
        }
        Insert: {
          address?: string | null
          building?: string | null
          card_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          first_name_kj?: string | null
          first_name_kn?: string | null
          id?: string
          last_name_kj?: string | null
          last_name_kn?: string | null
          order_id?: string | null
          phone?: string | null
          postal_code?: string | null
        }
        Update: {
          address?: string | null
          building?: string | null
          card_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          email?: string | null
          first_name_kj?: string | null
          first_name_kn?: string | null
          id?: string
          last_name_kj?: string | null
          last_name_kn?: string | null
          order_id?: string | null
          phone?: string | null
          postal_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_customer_info_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_customer_info_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_details: {
        Row: {
          allergy_note: string | null
          candle_option_id: string | null
          created_at: string | null
          detail_type: string
          id: string
          label: string | null
          message_text: string | null
          order_item_id: string
          price: number | null
          quantity: number | null
          updated_at: string | null
          whole_cake_option_id: string | null
          whole_cake_size_id: string | null
        }
        Insert: {
          allergy_note?: string | null
          candle_option_id?: string | null
          created_at?: string | null
          detail_type?: string
          id?: string
          label?: string | null
          message_text?: string | null
          order_item_id: string
          price?: number | null
          quantity?: number | null
          updated_at?: string | null
          whole_cake_option_id?: string | null
          whole_cake_size_id?: string | null
        }
        Update: {
          allergy_note?: string | null
          candle_option_id?: string | null
          created_at?: string | null
          detail_type?: string
          id?: string
          label?: string | null
          message_text?: string | null
          order_item_id?: string
          price?: number | null
          quantity?: number | null
          updated_at?: string | null
          whole_cake_option_id?: string | null
          whole_cake_size_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_details_candle_option_id_fkey"
            columns: ["candle_option_id"]
            isOneToOne: false
            referencedRelation: "candle_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_details_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_details_whole_cake_option_id_fkey"
            columns: ["whole_cake_option_id"]
            isOneToOne: false
            referencedRelation: "whole_cake_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_details_whole_cake_size_id_fkey"
            columns: ["whole_cake_size_id"]
            isOneToOne: false
            referencedRelation: "whole_cake_sizes"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          name: string
          order_id: string
          product_id: string | null
          quantity: number
          subtotal: number
          unit_price: number
          updated_at: string | null
          whole_cake_product_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string
          order_id: string
          product_id?: string | null
          quantity?: number
          subtotal?: number
          unit_price?: number
          updated_at?: string | null
          whole_cake_product_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          subtotal?: number
          unit_price?: number
          updated_at?: string | null
          whole_cake_product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_whole_cake_product_id_fkey"
            columns: ["whole_cake_product_id"]
            isOneToOne: false
            referencedRelation: "whole_cake_products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          coupon_amount: number | null
          created_at: string | null
          created_by: string | null
          customer_id: string | null
          customer_name: string | null
          delivery_address_id: string | null
          delivery_preference: boolean | null
          id: string
          is_prepared: boolean | null
          line_name: string | null
          notes: string | null
          order_completed_at: string | null
          order_confirmed: boolean | null
          order_date: string | null
          order_type: string
          payment_method: string | null
          payment_status: string | null
          phone: string | null
          pickup_date: string | null
          pickup_time_slot: string | null
          points_earned: number | null
          points_used: number | null
          preparing: boolean | null
          same_day: boolean | null
          shipping_address: string | null
          shipping_included: boolean | null
          status: string | null
          store_id: string
          subtotal: number | null
          total: number | null
          updated_at: string | null
          visit_time: string | null
        }
        Insert: {
          coupon_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          customer_name?: string | null
          delivery_address_id?: string | null
          delivery_preference?: boolean | null
          id?: string
          is_prepared?: boolean | null
          line_name?: string | null
          notes?: string | null
          order_completed_at?: string | null
          order_confirmed?: boolean | null
          order_date?: string | null
          order_type?: string
          payment_method?: string | null
          payment_status?: string | null
          phone?: string | null
          pickup_date?: string | null
          pickup_time_slot?: string | null
          points_earned?: number | null
          points_used?: number | null
          preparing?: boolean | null
          same_day?: boolean | null
          shipping_address?: string | null
          shipping_included?: boolean | null
          status?: string | null
          store_id: string
          subtotal?: number | null
          total?: number | null
          updated_at?: string | null
          visit_time?: string | null
        }
        Update: {
          coupon_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          customer_name?: string | null
          delivery_address_id?: string | null
          delivery_preference?: boolean | null
          id?: string
          is_prepared?: boolean | null
          line_name?: string | null
          notes?: string | null
          order_completed_at?: string | null
          order_confirmed?: boolean | null
          order_date?: string | null
          order_type?: string
          payment_method?: string | null
          payment_status?: string | null
          phone?: string | null
          pickup_date?: string | null
          pickup_time_slot?: string | null
          points_earned?: number | null
          points_used?: number | null
          preparing?: boolean | null
          same_day?: boolean | null
          shipping_address?: string | null
          shipping_included?: boolean | null
          status?: string | null
          store_id?: string
          subtotal?: number | null
          total?: number | null
          updated_at?: string | null
          visit_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      point_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string | null
          customer_id: string
          description: string | null
          id: string
          order_id: string | null
          store_id: string
          type: string
        }
        Insert: {
          amount?: number
          balance_after?: number
          created_at?: string | null
          customer_id: string
          description?: string | null
          id?: string
          order_id?: string | null
          store_id: string
          type?: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          order_id?: string | null
          store_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_transactions_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pt_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pt_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pt_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          sort_order: number | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pc_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      product_registrations: {
        Row: {
          accept_orders: boolean | null
          always_available: boolean | null
          created_date: string | null
          cross_section_image: string | null
          cur_same_day: boolean | null
          decoration: boolean | null
          description: string | null
          expiration_days: number | null
          id: string
          image: string | null
          ingredients: string | null
          is_ec: boolean | null
          max_per_day: number | null
          max_per_order: number | null
          name: string | null
          order_end_date: string | null
          order_start_date: string | null
          preparation_days: number | null
          price: number | null
          product_type_id: string | null
          shipping_type: string | null
          sort_order: number | null
          storage_type: string | null
          store_id: string
          updated_at: string | null
          volume: string | null
        }
        Insert: {
          accept_orders?: boolean | null
          always_available?: boolean | null
          created_date?: string | null
          cross_section_image?: string | null
          cur_same_day?: boolean | null
          decoration?: boolean | null
          description?: string | null
          expiration_days?: number | null
          id?: string
          image?: string | null
          ingredients?: string | null
          is_ec?: boolean | null
          max_per_day?: number | null
          max_per_order?: number | null
          name?: string | null
          order_end_date?: string | null
          order_start_date?: string | null
          preparation_days?: number | null
          price?: number | null
          product_type_id?: string | null
          shipping_type?: string | null
          sort_order?: number | null
          storage_type?: string | null
          store_id: string
          updated_at?: string | null
          volume?: string | null
        }
        Update: {
          accept_orders?: boolean | null
          always_available?: boolean | null
          created_date?: string | null
          cross_section_image?: string | null
          cur_same_day?: boolean | null
          decoration?: boolean | null
          description?: string | null
          expiration_days?: number | null
          id?: string
          image?: string | null
          ingredients?: string | null
          is_ec?: boolean | null
          max_per_day?: number | null
          max_per_order?: number | null
          name?: string | null
          order_end_date?: string | null
          order_start_date?: string | null
          preparation_days?: number | null
          price?: number | null
          product_type_id?: string | null
          shipping_type?: string | null
          sort_order?: number | null
          storage_type?: string | null
          store_id?: string
          updated_at?: string | null
          volume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_registrations_product_type_id_fkey"
            columns: ["product_type_id"]
            isOneToOne: false
            referencedRelation: "product_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_registrations_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      product_types: {
        Row: {
          created_at: string | null
          id: string
          product_type: string
          type_code: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_type?: string
          type_code?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_type?: string
          type_code?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      shipping_addresses: {
        Row: {
          address: string | null
          building: string | null
          city: string | null
          created_at: string | null
          customer_id: string
          id: string
          is_default: boolean | null
          postal_code: string | null
          prefecture: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          building?: string | null
          city?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          is_default?: boolean | null
          postal_code?: string | null
          prefecture?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          building?: string | null
          city?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          is_default?: boolean | null
          postal_code?: string | null
          prefecture?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sa_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipping_addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_fees: {
        Row: {
          created_at: string | null
          id: string
          max_distance: number | null
          min_distance: number | null
          price: number
          store_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_distance?: number | null
          min_distance?: number | null
          price?: number
          store_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_distance?: number | null
          min_distance?: number | null
          price?: number
          store_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sf_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipping_fees_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_users: {
        Row: {
          auth_user_id: string
          created_at: string | null
          email: string
          id: string
          role: string | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          auth_user_id: string
          created_at?: string | null
          email?: string
          id?: string
          role?: string | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string
          created_at?: string | null
          email?: string
          id?: string
          role?: string | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_users_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          address: string | null
          address_url: string | null
          city: string | null
          close_time: string | null
          closed_days: string[] | null
          created_at: string | null
          created_by: string | null
          delivery: boolean | null
          ec: boolean | null
          email: string | null
          id: string
          image: string | null
          join_date: string | null
          last_login: string | null
          line_official_account_id: string | null
          logo_url: string | null
          max_per_day: number | null
          max_per_order: number | null
          mrr: number | null
          name: string
          notification: boolean | null
          open_time: string | null
          owner_name: string | null
          phone: string | null
          plan: string | null
          postal_code: string | null
          prefecture: string | null
          same_day_cutoff_minutes: number | null
          specified_commercial_transaction: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          address_url?: string | null
          city?: string | null
          close_time?: string | null
          closed_days?: string[] | null
          created_at?: string | null
          created_by?: string | null
          delivery?: boolean | null
          ec?: boolean | null
          email?: string | null
          id?: string
          image?: string | null
          join_date?: string | null
          last_login?: string | null
          line_official_account_id?: string | null
          logo_url?: string | null
          max_per_day?: number | null
          max_per_order?: number | null
          mrr?: number | null
          name?: string
          notification?: boolean | null
          open_time?: string | null
          owner_name?: string | null
          phone?: string | null
          plan?: string | null
          postal_code?: string | null
          prefecture?: string | null
          same_day_cutoff_minutes?: number | null
          specified_commercial_transaction?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          address_url?: string | null
          city?: string | null
          close_time?: string | null
          closed_days?: string[] | null
          created_at?: string | null
          created_by?: string | null
          delivery?: boolean | null
          ec?: boolean | null
          email?: string | null
          id?: string
          image?: string | null
          join_date?: string | null
          last_login?: string | null
          line_official_account_id?: string | null
          logo_url?: string | null
          max_per_day?: number | null
          max_per_order?: number | null
          mrr?: number | null
          name?: string
          notification?: boolean | null
          open_time?: string | null
          owner_name?: string | null
          phone?: string | null
          plan?: string | null
          postal_code?: string | null
          prefecture?: string | null
          same_day_cutoff_minutes?: number | null
          specified_commercial_transaction?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancelled_at: string | null
          created_at: string | null
          id: string
          monthly_price: number
          plan: string
          started_at: string | null
          status: string | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string | null
          id?: string
          monthly_price?: number
          plan?: string
          started_at?: string | null
          status?: string | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string | null
          id?: string
          monthly_price?: number
          plan?: string
          started_at?: string | null
          status?: string | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      whole_cake_options: {
        Row: {
          created_at: string | null
          id: string
          image: string | null
          multiple_allowed: boolean | null
          name: string
          price: number
          sort_order: number | null
          updated_at: string | null
          whole_cake_product_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image?: string | null
          multiple_allowed?: boolean | null
          name?: string
          price?: number
          sort_order?: number | null
          updated_at?: string | null
          whole_cake_product_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string | null
          multiple_allowed?: boolean | null
          name?: string
          price?: number
          sort_order?: number | null
          updated_at?: string | null
          whole_cake_product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wco_product_id_fkey"
            columns: ["whole_cake_product_id"]
            isOneToOne: false
            referencedRelation: "whole_cake_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whole_cake_options_whole_cake_product_id_fkey"
            columns: ["whole_cake_product_id"]
            isOneToOne: false
            referencedRelation: "whole_cake_products"
            referencedColumns: ["id"]
          },
        ]
      }
      whole_cake_products: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          image: string | null
          name: string
          sort_order: number | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image?: string | null
          name?: string
          sort_order?: number | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          image?: string | null
          name?: string
          sort_order?: number | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wcp_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whole_cake_products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      whole_cake_sizes: {
        Row: {
          created_at: string | null
          id: string
          label: string
          price: number
          servings: string | null
          sort_order: number | null
          updated_at: string | null
          whole_cake_product_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string
          price?: number
          servings?: string | null
          sort_order?: number | null
          updated_at?: string | null
          whole_cake_product_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          price?: number
          servings?: string | null
          sort_order?: number | null
          updated_at?: string | null
          whole_cake_product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wcs_product_id_fkey"
            columns: ["whole_cake_product_id"]
            isOneToOne: false
            referencedRelation: "whole_cake_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whole_cake_sizes_whole_cake_product_id_fkey"
            columns: ["whole_cake_product_id"]
            isOneToOne: false
            referencedRelation: "whole_cake_products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
