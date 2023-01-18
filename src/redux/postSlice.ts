import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import {show} from "./itemSlice";

interface InitialState {
    loading: boolean,
    posts: Object[],
    error: string
}

const initialState: InitialState = {
    loading: false,
    posts: [],
    error: ''
}

export const fetchPosts = createAsyncThunk("post/fetchPost", async () => {

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() *100)}`)
    return response.data
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(show, state =>{
            state.posts = []
        })
        builder.addCase(fetchPosts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = [...current(state.posts), action.payload]
            state.error = ''
            console.log(state.posts)

        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.error.message || "Errore"
        })
    }
})

export default postSlice.reducer;
