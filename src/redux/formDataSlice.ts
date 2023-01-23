import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

type Hobby = {
    id: number,
    name: string
}

const hobby: Hobby[] = [{
    id: 1, name: "Calcio"},
    {
        id: 2, name: "Scacchi"
    }
    ,
    {
        id: 3, name: "Videogames"
    }
    ,
    {
        id: 4, name: "Studio"
    }
    ,
    {
        id: 5, name: "Lettura"
    }
    ,
    {
        id: 6, name: "Fotografia"
    }
    ,
    {
        id: 7, name: "Viaggiare"
    }
    ,
    {
        id: 8, name: "Bicicletta"
    }
    ,
    {
        id: 9, name: "Pallavolo"
    }
    ,
    {
        id: 10, name: "Paddel"
    }
]

const socialState: string[] = [
    "lavoro", "in cerca di lavoro",
    "disoccupato", "altro"
]

type InitialState = {
    hobby: Hobby[],
    socialState: string[]
}

type PayloadObject = {
    category: string,
    item: string
}

const initialState: InitialState = {
    hobby,
    socialState
}

export const formDataSlice = createSlice({
    name: "formData",
    initialState,
    reducers: {
        add: (state, action) => {
            if (initialState.hobby.includes(action.payload.item)) initialState.hobby.push(action.payload)
        },
        remove: (state, action) => {
            initialState.hobby = initialState.hobby.filter((item) => item !== action.payload)
        },
        reset: (state) => {
            initialState.hobby = []
        }
    }
})

export const {add, remove, reset} = formDataSlice.actions

export default formDataSlice.reducer