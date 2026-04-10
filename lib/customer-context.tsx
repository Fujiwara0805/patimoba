"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CustomerContextType {
  userId: number | null
  setUserId: (id: number | null) => void
  selectedStoreId: number | null
  setSelectedStoreId: (id: number | null) => void
  selectedStoreName: string
  setSelectedStoreName: (name: string) => void
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null)
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null)
  const [selectedStoreName, setSelectedStoreName] = useState<string>("")

  return (
    <CustomerContext.Provider
      value={{
        userId,
        setUserId,
        selectedStoreId,
        setSelectedStoreId,
        selectedStoreName,
        setSelectedStoreName,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomerContext() {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error("useCustomerContext must be used within a CustomerProvider")
  }
  return context
}
