
import { configureStore, createSlice } from "@reduxjs/toolkit"
import itemsSlice from "./counter";
import userSlice from "./privacy";

const itemStore = configureStore({
    reducer: { items: itemsSlice.reducer, userName: userSlice.reducer }
});



export default itemStore;