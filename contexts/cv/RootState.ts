import { combineReducers } from '@reduxjs/toolkit'
import currentTabReducer from './sidebar/currentTab'

const rootReducer = combineReducers({
  currentTab: currentTabReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
