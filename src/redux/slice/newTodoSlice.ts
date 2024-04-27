import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { FetchTodoItem } from './todoSlice';
import { toast } from 'react-toastify';





export const fetchNewTodo = createAsyncThunk(
    'todo/fetchNewTodoStatus',
    async (params: FetchTodoItem) => {
        const { data } = await axios.post<FetchTodoItem[]>('https://65ba40e4b4d53c0665526722.mockapi.io/items/', params);
        return data
    },
)

export interface TodoState {
    statusNewTodo: string;
    title: string;
    desc: string;

}

const initialState: TodoState = {
    statusNewTodo: '',
    title: '',
    desc: ''
}

export const setSlice = createSlice({
    name: 'newTodo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNewTodo.pending, (state) => {
            state.statusNewTodo = 'loading';

        }).addCase(fetchNewTodo.fulfilled, (state) => {
            state.statusNewTodo = 'success';
            toast.success("Cтворений");

        }).addCase(fetchNewTodo.rejected, (state) => {
            state.statusNewTodo = 'error';
            toast.error("Щось пішло не так")

        })
    },
})




export default setSlice.reducer