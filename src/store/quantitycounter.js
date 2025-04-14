import { createSlice } from "@reduxjs/toolkit"

const quantitySlice = createSlice({
    name: 'quantity',
    initialState: { currentvalue: 1 },
    reducers: {
        increment: (state, action) => {
          
            

        },
        decrement: (state, action) => {
            state.currentvalue--;
            if (state.currentvalue < 0) {
                state.currentvalue = 0;
            }
        },
       
    }
})
export default quantitySlice;
export const quantityAction = quantitySlice.actions;