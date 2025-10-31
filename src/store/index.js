import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slice/usersSlice";


export const store = configureStore({
    reducer : {
        users : usersSlice
    }
})