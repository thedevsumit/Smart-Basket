
import { configureStore, createSlice } from "@reduxjs/toolkit"
import itemsSlice from "./counter";
import privacySlice from "./privacy";

const itemStore = configureStore({
    reducer: { items: itemsSlice.reducer, privacy: privacySlice.reducer }
});



export default itemStore;