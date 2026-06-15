import { useMemo } from 'react'

import { flightsActions, type FlightFilters, type FlightSort, type FlightsState } from './flights-slice'
import { useAppDispatch, useAppSelector } from './index'

export type { FlightFilters, FlightSort }

export interface FlightView extends FlightsState {
  setFilters: (next: Partial<FlightFilters>) => void
  resetFilters: () => void
}

export function useFlightStore(): FlightView
export function useFlightStore<T>(selector: (s: FlightView) => T): T
export function useFlightStore<T>(selector?: (s: FlightView) => T): T | FlightView {
  const dispatch = useAppDispatch()
  const state = useAppSelector(s => s.flights)

  const view = useMemo<FlightView>(
    () => ({
      ...state,
      setFilters: next => {
        dispatch(flightsActions.setFilters(next))
      },
      resetFilters: () => {
        dispatch(flightsActions.resetFilters())
      },
    }),
    [state, dispatch],
  )

  return selector ? selector(view) : view
}
