export interface Payment {
  id: string
  transactionId: string
  bookingId: string
  bookingCode: string
  pilgrimName: string
  amount: number
  method: 'card' | 'bank-transfer' | 'paypal' | 'apple-pay' | 'klarna' | 'affirm'
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
  installmentNumber?: number
  installmentsTotal?: number
}

export const payments: Payment[] = []
