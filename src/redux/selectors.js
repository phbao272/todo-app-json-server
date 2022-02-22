import { createSelector } from '@reduxjs/toolkit'

const filters = {
    All: () => true,
    Completed: (todo) => todo.completed,
    Todo: (todo) => !todo.completed,
}

export const todoListSelector = (state) => state.todoList
export const searchTextSelector = (state) => state.filters.search
export const statusFilterSelector = (state) => state.filters.status
export const prioritiesSelector = (state) => state.filters.priorities

export const todoRemaningSelector = createSelector(
    todoListSelector,
    searchTextSelector,
    statusFilterSelector,
    prioritiesSelector,
    (todoList, searchText, status, priorities) => {
        const newState = todoList.filter((todo) => {
            return (
                todo.name.includes(searchText) &&
                filters[status](todo) &&
                (priorities.length > 0
                    ? priorities.includes(todo.priority)
                    : true)
            )
        })

        return newState
    },
)
