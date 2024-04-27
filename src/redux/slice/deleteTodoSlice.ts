import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { FetchTodoItem } from './todoSlice';





export const fetchDeleteTodo = createAsyncThunk(
    'todo/fetchDeleteTodoStatus',
    async (params: FetchTodoItem) => {
        const { data } = await axios.put<FetchTodoItem[]>(`https://65ba40e4b4d53c0665526722.mockapi.io/items/${params.id}`, params);
        return data
    },
)

export interface TodoState {
    status: string;
    btnStatus: { [itemId: string]: boolean };
}

const initialState: TodoState = {
    status: 'loading',
    btnStatus: {}
}

export const setSlice = createSlice({
    name: 'deleteTodo',
    initialState,
    reducers: {
        setBtnStatus(state, action: PayloadAction<{ itemId: string; isActive: boolean }>) {
            state.btnStatus[action.payload.itemId] = action.payload.isActive;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDeleteTodo.pending, (state) => {
            state.status = 'loading';

        }).addCase(fetchDeleteTodo.fulfilled, (state) => {
            state.status = 'success';

        }).addCase(fetchDeleteTodo.rejected, (state) => {
            state.status = 'error';

        })
    },
})


export const { setBtnStatus } = setSlice.actions

export default setSlice.reducer