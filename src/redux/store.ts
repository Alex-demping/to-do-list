import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import todoSlice from './slice/todoSlice'
import sharchSlice from './slice/sharchSlice'
import editTodoSlice from './slice/editTodoSlice'
import newTodoSlice from './slice/newTodoSlice'
import deleteTodoSlice from './slice/deleteTodoSlice'

export const store = configureStore({
    reducer: {
        todo: todoSlice,
        sharch: sharchSlice,
        editTodo: editTodoSlice,
        newTodo: newTodoSlice,
        deleteTodo: deleteTodoSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 