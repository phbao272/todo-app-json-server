import { createSlice } from '@reduxjs/toolkit'

export const FiltersSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priorities: [],
    },
    reducers: {
        searchTextChange: (state, action) => {
            state.search = action.payload
        },
        statusFilterChange: (state, action) => {
            state.status = action.payload
        },
        prioritiesFilterChange: (state, action) => {
            state.priorities = action.payload
        },
    },
})

export const { searchTextChange, statusFilterChange, prioritiesFilterChange } =
    FiltersSlice.actions
export default FiltersSlice.reducer
