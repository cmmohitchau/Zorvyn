import type { RoleType } from "@/Types/roleType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


const loadRole = () => {
    try {
        const role = localStorage.getItem('role');

        if(!role) return "viewer";
        return JSON.parse(role);

    } catch {
        return "viewer";
    }
}

const initialState : { role : RoleType} = { role : loadRole(), }

const roleSlice = createSlice({
    name : "role",
    initialState ,
    reducers : {
        setRole : (state , action : PayloadAction<RoleType>) => {
            state.role = action.payload;
            localStorage.setItem("role" , JSON.stringify(action.payload));
        }
    }
})

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;