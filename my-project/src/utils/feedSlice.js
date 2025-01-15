import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload||[],
        removeUserFromFeed:(state,action)=>{
            console.log(action,".....",state);
            const filterd=state.filter((e)=>e._id!=action.payload)
            console.log(filterd)
            return filterd
        }
    }
})
export const {addFeed,removeUserFromFeed}=feedSlice.actions;
export default feedSlice.reducer;