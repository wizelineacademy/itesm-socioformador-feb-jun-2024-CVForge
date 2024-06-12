import { configureStore } from '@reduxjs/toolkit'
import currentTabReducer from './sidebar/currentTab'

export const store = configureStore({
  reducer: {
    currentTab: currentTabReducer,
  },
})
