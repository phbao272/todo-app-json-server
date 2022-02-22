import axios from 'axios'

const URL_TODO_LIST =
    'https://todo-list-json-server.herokuapp.com/api/todo-list'

export const getTodoListData = async () => {
    return await axios.get(URL_TODO_LIST)
}

export const postTodo = async (payload) => {
    return await axios.post(URL_TODO_LIST, payload)
}

export const deleteTodoData = async (todoId) => {
    return await axios.delete(`${URL_TODO_LIST}/${todoId}`)
}

export const patchTodoName = async (todoId, payload) => {
    return await axios.patch(`${URL_TODO_LIST}/${todoId}`, payload)
}

export const patchToggleTodo = async (todoId, payload) => {
    return await axios.patch(`${URL_TODO_LIST}/${todoId}`, payload)
}
