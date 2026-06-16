import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import { baseApi } from './api/baseApi'
import authReducer from './fetchres/auth/authSlice'
import cartReducer from './cartSlice'
import packagesReducer from './packagesSlice'
import { storage } from './storage'

// ==========================
// Persist Configs
// ==========================

const persistAuthConfig: PersistConfig<ReturnType<typeof authReducer>> = {
  key: 'auth',
  storage,
}

const persistCartConfig: PersistConfig<ReturnType<typeof cartReducer>> = {
  key: 'cart',
  storage,
  version: 1,
}

// ==========================
// Persisted Reducers
// ==========================

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer)
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer)

// ==========================
// Store
// ==========================

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    packages: packagesReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

// ==========================
// Types
// ==========================

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// ==========================
// Persistor
// ==========================

export const persistor = persistStore(store)
