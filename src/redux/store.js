import { configureStore } from '@reduxjs/toolkit'
import FiltersReducer from '../components/filters/FiltersSlice'
import TodoListReducer from '../components/todoList/TodoListSlice'

const store = configureStore({
    reducer: {
        filters: FiltersReducer,
        todoList: TodoListReducer,
    },
})

export default store
