import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

const hobby = [
    "Calcio", "Scacchi",
    "Videogames", "Studio",
    "Lettura", "Fotografia",
    "Viaggiare", "Bicicletta",
    "Pallavolo", "Paddel"
]

type InitialState = {
    hobby: string[]
}

const initialState: InitialState = {
    hobby: hobby
}

export const formDataSlice = createSlice({
    name: "formData",
    initialState,
    reducers: {
        add:(state,action)=>{
            if (initialState.hobby.includes(action.payload)) initialState.hobby.push(action.payload)
        },
        remove: (state, action) =>{
            initialState.hobby = initialState.hobby.filter((item)=> item !== action.payload)
        },
        reset:(state)=>{
            initialState.hobby = []
        }
    }
})

export const {add, remove, reset} = formDataSlice.actions

export default formDataSlice.reducer