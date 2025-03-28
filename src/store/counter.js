import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
    name: 'items',
    initialState: { currentValue: [] },
    reducers: {
        adding: (state, action) => {
            state.currentValue.push(action.payload)
            

        },
        removing: (state, action) => {
            state.currentValue = state.currentValue.filter((item) => item !== action.payload)

        },
        reset: (state, action) => {
            state.currentValue = []
        },
    }
})
export default itemsSlice;
export const itemAction = itemsSlice.actions;