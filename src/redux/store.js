import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './slice/home'

export const store = configureStore({
  reducer: {
    home: homeSlice
  },
})