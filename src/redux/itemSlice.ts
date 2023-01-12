import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import mock_data from "../MOCK_DATA.json"

export interface MockData {
    categoria: string,
    codice: string,
    descrizione: string,
    id: number,
    idCategoria: number,
}

type CategoryInfo = {
    [key: string]: string | number,
}

interface InitialState{
    items: MockData[] | [],
    visualizedItems: MockData[] | [],
    categoryInfo: CategoryInfo

}

const categoryInfo = mock_data.body.reduce((agg, item)=>{
    return{
        ...agg,
        [item.idCategoria]: item.categoria
    }
})

const initialState : InitialState= {
    items: mock_data.body,
    visualizedItems: mock_data.body,
    categoryInfo
}
export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        show: (state) => {
            console.log(state)
        },
        filter: (state, action:PayloadAction<{codice: string, descrizione: string, categoria: string }>) => {
    state.visualizedItems = state.items.filter(item => action.payload.codice === item.codice || action.payload.codice === '')
        .filter(item => item.descrizione.toLowerCase().includes(action.payload.descrizione.toLowerCase()) || action.payload.descrizione === '')
        .filter(item => parseInt(action.payload.categoria) === item.idCategoria || action.payload.categoria === '')
        }
    },
})

export const { show, filter } = itemSlice.actions

export default itemSlice.reducer