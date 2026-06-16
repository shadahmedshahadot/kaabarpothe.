import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CartItemKind = 'package' | 'flight' | 'hotel' | 'transport'

export interface CartItem {
  id: string
  kind: CartItemKind
  refId: string
  title: string
  subtitle: string
  meta: Record<string, unknown>
  unitPrice: number
  qty: number
  image: string
  addedAt: number
}

export interface Traveler {
  id: string
  fullName: string
  gender: 'male' | 'female'
  dateOfBirth: string
  passportNumber: string
  passportExpiry: string
  nationality: string
  mobile: string
  email: string
  emergencyContact: string
}

export interface ContactInfo {
  name: string
  email: string
  phone: string
}

export type PaymentMethod = 'bkash' | 'nagad' | 'sslcommerz' | 'bank-transfer'
export type PaymentPlan = 'full' | 'partial' | 'installment'

export interface SavedBooking {
  code: string
  createdAt: string
  items: CartItem[]
  travelers: Traveler[]
  contact: ContactInfo
  paymentMethod: PaymentMethod
  paymentPlan: PaymentPlan
  subtotal: number
  taxes: number
  serviceFee: number
  discount: number
  total: number
  paidAmount: number
  status: 'pending' | 'confirmed'
  notes: string
}

export interface CartState {
  items: CartItem[]
  travelers: Traveler[]
  contact: ContactInfo
  paymentMethod: PaymentMethod
  paymentPlan: PaymentPlan
  notes: string
  savedBookings: SavedBooking[]
}

const emptyContact: ContactInfo = { name: '', email: '', phone: '' }

const newId = () => `ci-${Math.random().toString(36).slice(2, 10)}`

const initialState: CartState = {
  items: [],
  travelers: [],
  contact: emptyContact,
  paymentMethod: 'bkash',
  paymentPlan: 'full',
  notes: '',
  savedBookings: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      reducer(state, action: PayloadAction<CartItem>) {
        const input = action.payload
        const dupe = state.items.find(it => it.kind === input.kind && it.refId === input.refId)
        if (dupe) {
          dupe.qty += input.qty
          dupe.meta = { ...dupe.meta, ...input.meta }
          dupe.unitPrice = input.unitPrice
        } else {
          state.items.push(input)
        }
      },
      prepare(input: Omit<CartItem, 'id' | 'addedAt'>) {
        return {
          payload: { ...input, id: newId(), addedAt: Date.now() } as CartItem,
        }
      },
    },
    updateItem(state, action: PayloadAction<{ id: string; patch: Partial<CartItem> }>) {
      const it = state.items.find(i => i.id === action.payload.id)
      if (it) Object.assign(it, action.payload.patch)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
      state.travelers = []
      state.contact = emptyContact
      state.paymentMethod = 'bkash'
      state.paymentPlan = 'full'
      state.notes = ''
    },
    setTravelers(state, action: PayloadAction<Traveler[]>) {
      state.travelers = action.payload
    },
    setContact(state, action: PayloadAction<ContactInfo>) {
      state.contact = action.payload
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload
    },
    setPaymentPlan(state, action: PayloadAction<PaymentPlan>) {
      state.paymentPlan = action.payload
    },
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload
    },
    saveBooking: {
      reducer(state, action: PayloadAction<SavedBooking>) {
        state.savedBookings.unshift(action.payload)
      },
      prepare(incoming: Omit<SavedBooking, 'createdAt'> & { createdAt?: string }) {
        return {
          payload: {
            ...incoming,
            createdAt: incoming.createdAt ?? new Date().toISOString(),
          } as SavedBooking,
        }
      },
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
