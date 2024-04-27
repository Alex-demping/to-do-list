import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FetchTodoItem } from './todoSlice';


export const fetchShare = createAsyncThunk(
    'todo/fetchTodoStatus',
    async (value: string) => {
        const response = await axios.get<FetchTodoItem[]>(`https://65ba40e4b4d53c0665526722.mockapi.io/items?title=${value}`);
        return response.data

    },
)

export interface FilterState {
    shareValue: string,
    statusShare: string;
    items: FetchTodoItem[];
    shareStart: boolean;
}


const initialState: FilterState = {
    shareValue: '',
    statusShare: 'loading',
    items: [],
    shareStart: false,
}

export const setSlice = createSlice({
    name: 'share',
    initialState,
    reducers: {
        setShareValue(state, action: PayloadAction<string>) {
            state.shareValue = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchShare.pending, (state) => {
            state.items = [];
            state.statusShare = 'loading';

        }).addCase(fetchShare.fulfilled, (state, action) => {
            state.items = action.payload;
            state.statusShare = 'success';

        }).addCase(fetchShare.rejected, (state, action) => {
            if (action.error.code === 'ERR_BAD_REQUEST') {
                state.statusShare = 'notFound';
                state.items = [];
            } else {
                state.items = [];
                state.statusShare = 'error';
            }
            state.items = [];
        })
    },
})


export const { setShareValue } = setSlice.actions

export default setSlice.reducer