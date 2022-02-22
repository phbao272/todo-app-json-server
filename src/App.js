import { Typography, Divider } from 'antd'

import './App.css'
import Filters from './components/filters/Filters'
import TodoList from './components/todoList/TodoList'

function App() {
    return (
        <div className="App">
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
                TODO APP with REDUX
            </Typography.Title>
            <Filters />
            <Divider />
            <TodoList />
        </div>
    )
}

export default App
