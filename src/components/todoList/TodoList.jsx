import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Tag, Form, Input, Select, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { getTodoListData, postTodo } from '../../apis'
import { addTodo, createTodoList } from './TodoListSlice'
import { todoRemaningSelector } from '../../redux/selectors'
import Todo from '../todo/Todo'

const { Option } = Select

const TodoList = () => {
    const dispatch = useDispatch()
    const [todoName, setTodoName] = useState('')
    const [priority, setPriority] = useState('Medium')

    const todoListRef = useRef(null)
    const todoInputRef = useRef(null)

    const todoList = useSelector(todoRemaningSelector)

    // Responsive mobile todo list
    useEffect(() => {
        const screenHeight = document.body.scrollHeight
        const screenWidth = document.body.scrollWidth
        if (screenWidth < 767) {
            todoListRef.current.style.maxHeight =
                screenHeight - todoListRef.current.offsetTop - 65 + 'px'
        }
    }, [])

    // setInitTodoListData
    useEffect(() => {
        setInitTodoListData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setInitTodoListData = async () => {
        getTodoListData()
            .then((res) => dispatch(createTodoList(res.data)))
            .catch((err) => console.log('error getTodoListData', { err }))
            .finally(() => console.log('finished getTodoListData'))
    }

    const handleAddTodo = () => {
        if (todoName.trim().length > 0) {
            const todoData = {
                id: uuidv4(),
                name: todoName,
                priority,
            }

            dispatch(addTodo({ ...todoData, completed: false }))
            postTodo(todoData)
                .catch((err) => console.log('error postTodo', { err }))
                .finally(() => console.log('finished postTodo'))

            // Reset input todo name
            setTodoName('')
            setPriority('Medium')
            todoInputRef.current.focus()
        }
    }

    const handleTodoNameChange = (e) => {
        setTodoName(e.target.value)
    }

    const handlePriorityChange = (value) => {
        setPriority(value)
    }

    return (
        <div
            id="todo-list"
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',
            }}
        >
            <Row
                ref={todoListRef}
                className="todo-list"
                style={{ overflowY: 'auto', maxHeight: 260 }}
            >
                {todoList.map((todo) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        name={todo.name}
                        completed={todo.completed}
                        priority={todo.priority}
                    />
                ))}
            </Row>
            <Form
                className="todo-form"
                style={{
                    display: 'flex',
                }}
            >
                <Input
                    ref={todoInputRef}
                    placeholder="Enter your todo..."
                    value={todoName}
                    onChange={handleTodoNameChange}
                />
                <Select
                    defaultValue="Medium"
                    onChange={handlePriorityChange}
                    value={priority}
                >
                    <Option value="High">
                        <Tag color="red">High</Tag>
                    </Option>
                    <Option value="Medium">
                        <Tag color="blue">Medium</Tag>
                    </Option>
                    <Option value="Low">
                        <Tag color="gray">Low</Tag>
                    </Option>
                </Select>
                <Button type="primary" onClick={handleAddTodo}>
                    Add
                </Button>
            </Form>
        </div>
    )
}

export default TodoList
