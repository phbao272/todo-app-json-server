import { createSlice } from '@reduxjs/toolkit'

export const TodoListSlice = createSlice({
    name: 'todoList',
    initialState: [],
    reducers: {
        createTodoList: (state, action) => {
            return action.payload
        },
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        updateNameTodo: (state, action) => {
            const currTodo = state.find((item) => item.id === action.payload.id)
            currTodo.name = action.payload.name
        },
        toggleTodo: (state, action) => {
            const currTodo = state.find((item) => item.id === action.payload)
            currTodo.completed = !currTodo.completed
        },
        deleteTodo: (state, action) => {
            const newState = state.filter((item) => item.id !== action.payload)
            return newState
        },
    },
})

export const {
    createTodoList,
    addTodo,
    updateNameTodo,
    toggleTodo,
    deleteTodo,
} = TodoListSlice.actions

export default TodoListSlice.reducer
