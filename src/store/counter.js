import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
    name: "items",
    initialState: { currentValue: [], newItem: [] },
    reducers: {
        adding: (state, action) => {
            state.currentValue.push(action.payload);
        },
        removing: (state, action) => {
            state.currentValue = state.currentValue.filter((item) => item !== action.payload);
        },
        itemadd: (state, action) => {
            const exists = state.newItem.find((item) => item.title === action.payload.title);
            if (!exists) {
                const newItem = { ...action.payload, quantity: 1 };
                state.newItem.push(newItem);
            }
        }
        ,
        incrementQuantity: (state, action) => {
            const item = state.newItem.find((item) => item.title === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.newItem.find((item) => item.title === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        clearCart: (state) => {
            state.newItem = [];
          },
          removingFromCart: (state, action) => {
            state.newItem = state.newItem.filter((item) => item.title !== action.payload);
          },
          
    },
});

export default itemsSlice;
export const itemAction = itemsSlice.actions;
