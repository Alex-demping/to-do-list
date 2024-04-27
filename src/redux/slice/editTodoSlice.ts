import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { FetchTodoItem } from './todoSlice';
import { toast } from 'react-toastify';





export const fetchEditTodo = createAsyncThunk(
    'todo/fetchEditTodoStatus',
    async ({ params, id }: { params: FetchTodoItem, id: number }) => {
        const { data } = await axios.put<FetchTodoItem[]>(`https://65ba40e4b4d53c0665526722.mockapi.io/items/${id}`, params);
        return data
    },
)

export interface TodoState {
    statusEdit: string;
    title: string;
    desc: string;

}

const initialState: TodoState = {
    statusEdit: '',
    title: '',
    desc: ''
}

export const setSlice = createSlice({
    name: 'editTodo',
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },
        setDesc(state, action: PayloadAction<string>) {
            state.desc = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEditTodo.pending, (state) => {
            state.statusEdit = 'loading';

        }).addCase(fetchEditTodo.fulfilled, (state) => {
            state.statusEdit = 'success';
            toast.success("Зміни збережено")

        }).addCase(fetchEditTodo.rejected, (state) => {
            state.statusEdit = 'error';
            toast.error("Щось пішло не так")

        })
    },
})


export const { setTitle, setDesc } = setSlice.actions

export default setSlice.reducer