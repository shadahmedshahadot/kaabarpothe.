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

export const payments: Payment[] = [
  { id: 'pay-001', transactionId: 'TXN-20251120-A1F8', bookingId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6750, method: 'card', status: 'completed', date: '2025-11-20T10:15:00', installmentNumber: 1, installmentsTotal: 4 },
  { id: 'pay-002', transactionId: 'TXN-20251220-B2C3', bookingId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6750, method: 'card', status: 'completed', date: '2025-12-20T10:15:00', installmentNumber: 2, installmentsTotal: 4 },
  { id: 'pay-003', transactionId: 'TXN-20260120-D4E5', bookingId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6750, method: 'card', status: 'completed', date: '2026-01-20T10:15:00', installmentNumber: 3, installmentsTotal: 4 },
  { id: 'pay-004', transactionId: 'TXN-20260220-F6G7', bookingId: 'bkg-1001', bookingCode: 'HJ-2026-1001', pilgrimName: 'মোহাম্মদ আনোয়ার', amount: 6748, method: 'card', status: 'completed', date: '2026-02-20T10:15:00', installmentNumber: 4, installmentsTotal: 4 },
  { id: 'pay-005', transactionId: 'TXN-20251208-H8I9', bookingId: 'bkg-1002', bookingCode: 'UM-2026-1002', pilgrimName: 'আয়েশা খান', amount: 875, method: 'paypal', status: 'completed', date: '2025-12-08T15:20:00', installmentNumber: 1, installmentsTotal: 2 },
  { id: 'pay-006', transactionId: 'TXN-20260108-J1K2', bookingId: 'bkg-1002', bookingCode: 'UM-2026-1002', pilgrimName: 'আয়েশা খান', amount: 874, method: 'paypal', status: 'completed', date: '2026-01-08T15:20:00', installmentNumber: 2, installmentsTotal: 2 },
  { id: 'pay-007', transactionId: 'TXN-20251012-L3M4', bookingId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 12000, method: 'bank-transfer', status: 'completed', date: '2025-10-12T09:00:00', installmentNumber: 1, installmentsTotal: 5 },
  { id: 'pay-008', transactionId: 'TXN-20251112-N5O6', bookingId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 9000, method: 'bank-transfer', status: 'completed', date: '2025-11-12T09:00:00', installmentNumber: 2, installmentsTotal: 5 },
  { id: 'pay-009', transactionId: 'TXN-20251212-P7Q8', bookingId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 9000, method: 'bank-transfer', status: 'completed', date: '2025-12-12T09:00:00', installmentNumber: 3, installmentsTotal: 5 },
  { id: 'pay-010', transactionId: 'TXN-20260208-R9S0', bookingId: 'bkg-1010', bookingCode: 'UM-2026-1010', pilgrimName: 'নুসায়বা আলি', amount: 800, method: 'apple-pay', status: 'pending', date: '2026-02-08T16:30:00', installmentNumber: 1, installmentsTotal: 3 },
  { id: 'pay-011', transactionId: 'TXN-20260108-T1U2', bookingId: 'bkg-1007', bookingCode: 'UM-2026-1007', pilgrimName: 'খালিদ রশিদ', amount: 1500, method: 'card', status: 'completed', date: '2026-01-08T14:45:00', installmentNumber: 1, installmentsTotal: 4 },
  { id: 'pay-012', transactionId: 'TXN-20260601-V3W4', bookingId: 'bkg-1003', bookingCode: 'HJ-2026-1003', pilgrimName: 'ইউসুফ গার্সিয়া', amount: 16998, method: 'bank-transfer', status: 'pending', date: '2026-06-01T00:00:00', installmentNumber: 4, installmentsTotal: 5 },
]
