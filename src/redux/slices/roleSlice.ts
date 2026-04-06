import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Role = "admin" | "viewer"

const initialState = {
    role : "admin"
}

const roleSlice = createSlice({
    name : "role",
    initialState ,
    reducers : {
        setRole : (state , action : PayloadAction<Role>) => {
            state.role = action.payload;
        }
    }
})

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;