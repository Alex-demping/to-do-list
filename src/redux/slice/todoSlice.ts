import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';


export interface FetchTodoItem {
    id?: number;
    title: string;
    description: string;
    done: boolean;
}


export const fetchTodo = createAsyncThunk(
    'todo/fetchTodoStatus',
    async (params?: string) => {

        if (params === "/delete") {
            const { data } = await axios.get<FetchTodoItem[]>('https://65ba40e4b4d53c0665526722.mockapi.io/items?done=true');
            return data
        } else {
            const { data } = await axios.get<FetchTodoItem[]>('https://65ba40e4b4d53c0665526722.mockapi.io/items');
            return data
        }

    },
)

export interface TodoState {
    status: string;
    items: FetchTodoItem[];

}

const initialState: TodoState = {
    status: 'loading',
    items: [],
}

export const setSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<FetchTodoItem[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
            state.items = [];
            state.status = 'loading';

        }).addCase(fetchTodo.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';

        }).addCase(fetchTodo.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        })
    },
})


export const { setItems } = setSlice.actions

export default setSlice.reducer