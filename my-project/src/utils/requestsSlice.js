import { createSlice } from "@reduxjs/toolkit";

const requestsSlice=createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequests:(state,action)=> {
            const filtered=state.filter((e)=>e.fromUserId._id!=action.payload)
            return filtered
        }
    }
})
export const {addRequests,removeRequests}=requestsSlice.actions
export default requestsSlice.reducer