import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import cartReducer from './cart-slice'
import flightsReducer from './flights-slice'
import packagesReducer from './packages-slice'
import { storage } from './storage'

const persistedCartReducer = persistReducer(
  { key: 'sakinah-cart', storage, version: 1 },
  cartReducer,
)

const rootReducer = combineReducers({
  cart: persistedCartReducer,
  flights: flightsReducer,
  packages: packagesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefault =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
