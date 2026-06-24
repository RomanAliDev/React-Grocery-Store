import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        AddItem:(state,action) =>{
            const existItem=state.find((product) => product.id==action.payload.id )
            if(existItem){
                return state.map((product) => product.id===action.payload.id ?{...product,unit:product.unit+1}:product )
            }else{
                state.push(action.payload)
            }
            
        },
        RemoveItem:(state,action) =>{
            return state.filter((product) =>product.id!==action.payload)
        },
        IncrementUnit: (state,action) =>{
            return state.map((product) =>product.id === action.payload?{...product,unit:product.unit+1}:product)
        },
        DecrementUnit: (state,action) =>{
            return state.map((product) =>product.id === action.payload?{...product,unit:product.unit-1}:product)
        }
    }
})

export const {AddItem,RemoveItem,IncrementUnit,DecrementUnit}=cartSlice.actions;
export default cartSlice.reducer;
