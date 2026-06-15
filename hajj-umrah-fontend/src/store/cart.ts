import { useMemo } from 'react'

import {
  cartActions,
  type CartItem,
  type CartItemKind,
  type CartState,
  type ContactInfo,
  type PaymentMethod,
  type PaymentPlan,
  type SavedBooking,
  type Traveler,
} from './cart-slice'
import { useAppDispatch, useAppSelector } from './index'

export type { CartItem, CartItemKind, ContactInfo, PaymentMethod, PaymentPlan, SavedBooking, Traveler }

export const SERVICE_FEE = 35
export const TAX_RATE = 0

export interface CartView extends CartState {
  addItem: (input: Omit<CartItem, 'id' | 'addedAt'>) => void
  updateItem: (id: string, patch: Partial<CartItem>) => void
  removeItem: (id: string) => void
  clearCart: () => void
  setTravelers: (travelers: Traveler[]) => void
  setContact: (contact: ContactInfo) => void
  setPaymentMethod: (m: PaymentMethod) => void
  setPaymentPlan: (p: PaymentPlan) => void
  setNotes: (notes: string) => void
  saveBooking: (
    b: Omit<SavedBooking, 'createdAt'> & { createdAt?: string },
  ) => void
}

export function useCartStore(): CartView
export function useCartStore<T>(selector: (s: CartView) => T): T
export function useCartStore<T>(selector?: (s: CartView) => T): T | CartView {
  const dispatch = useAppDispatch()
  const state = useAppSelector(s => s.cart)

  const view = useMemo<CartView>(
    () => ({
      ...state,
      addItem: input => {
        dispatch(cartActions.addItem(input))
      },
      updateItem: (id, patch) => {
        dispatch(cartActions.updateItem({ id, patch }))
      },
      removeItem: id => {
        dispatch(cartActions.removeItem(id))
      },
      clearCart: () => {
        dispatch(cartActions.clearCart())
      },
      setTravelers: travelers => {
        dispatch(cartActions.setTravelers(travelers))
      },
      setContact: contact => {
        dispatch(cartActions.setContact(contact))
      },
      setPaymentMethod: m => {
        dispatch(cartActions.setPaymentMethod(m))
      },
      setPaymentPlan: p => {
        dispatch(cartActions.setPaymentPlan(p))
      },
      setNotes: notes => {
        dispatch(cartActions.setNotes(notes))
      },
      saveBooking: incoming => {
        dispatch(cartActions.saveBooking(incoming))
      },
    }),
    [state, dispatch],
  )

  return selector ? selector(view) : view
}

useCartStore.getState = (): CartView => {
  throw new Error('useCartStore.getState is type-only after redux migration')
}

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0)

export const cartTotals = (items: CartItem[]) => {
  const subtotal = cartSubtotal(items)
  const taxes = Math.round(subtotal * TAX_RATE)
  const serviceFee = items.length === 0 ? 0 : SERVICE_FEE
  const total = subtotal + taxes + serviceFee
  return { subtotal, taxes, serviceFee, total }
}

export const newBookingCode = () => `SKN-${Date.now().toString(36).toUpperCase()}`

export const blankTraveler = (): Traveler => ({
  id: `tv-${Math.random().toString(36).slice(2, 10)}`,
  fullName: '',
  gender: 'male',
  dateOfBirth: '',
  passportNumber: '',
  passportExpiry: '',
  nationality: 'Bangladeshi',
  mobile: '',
  email: '',
  emergencyContact: '',
})
