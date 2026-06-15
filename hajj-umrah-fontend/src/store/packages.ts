import { useMemo } from 'react'

import {
  packagesActions,
  type Package,
  type PackageFilters,
  type PackagesState,
} from './packages-slice'
import { useAppDispatch, useAppSelector } from './index'

export type { Package, PackageFilters }

export interface PackageView extends PackagesState {
  setFilters: (next: Partial<PackageFilters>) => void
  resetFilters: () => void
}

export function usePackageStore(): PackageView
export function usePackageStore<T>(selector: (s: PackageView) => T): T
export function usePackageStore<T>(selector?: (s: PackageView) => T): T | PackageView {
  const dispatch = useAppDispatch()
  const state = useAppSelector(s => s.packages)

  const view = useMemo<PackageView>(
    () => ({
      ...state,
      setFilters: next => {
        dispatch(packagesActions.setFilters(next))
      },
      resetFilters: () => {
        dispatch(packagesActions.resetFilters())
      },
    }),
    [state, dispatch],
  )

  return selector ? selector(view) : view
}
