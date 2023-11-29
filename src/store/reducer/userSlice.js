import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
       checkLogin: false
    },
    reducers:{
        checkLogin: (state, action) => {
            state.checkLogin = true
        },
        logOut: (state,action) => {
            state.checkLogin = false
        },
    },
    extraReducers:()=>{
        
    }
});
export const {checkLogin, logOut} = userSlice.actions;
export default userSlice.reducer