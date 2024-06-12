import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Must set the tabs as their according folder route
type Tabs = string

const initialState: Tabs = ''

export const currentTabSlice = createSlice({
  name: 'currentTab',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<Tabs>) => {
      return action.payload
    },
  },
})

export const { setCurrentTab } = currentTabSlice.actions
export default currentTabSlice.reducer
