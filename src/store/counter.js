import { createSlice } from "@reduxjs/toolkit"

const itemsSlice = createSlice({
    name: 'items',
    initialState: { currentValue: [],newItem: [] },
    reducers: {
        adding: (state, action) => {
            state.currentValue.push(action.payload)
            

        },
        removing: (state, action) => {
            state.currentValue = state.currentValue.filter((item) => item !== action.payload)

        },
        itemadd: (state, action) => {
            state.newItem = [...state.newItem, action.payload]
        },
    }
})
export default itemsSlice;
export const itemAction = itemsSlice.actions;