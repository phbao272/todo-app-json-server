import React, { useState, useEffect } from 'react'
import { Row, Col, Checkbox, Tag, Typography } from 'antd'
import { useDispatch } from 'react-redux'

import { deleteTodoData, patchTodoName, patchToggleTodo } from '../../apis'

import {
    updateNameTodo,
    deleteTodo,
    toggleTodo,
} from '../todoList/TodoListSlice'

const colorPriorityMapping = {
    Low: 'gray',
    Medium: 'blue',
    High: 'red',
}

const { Paragraph } = Typography

const Todo = ({ id, name, priority, completed }) => {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(completed)
    const [todoName, setTodoName] = useState(name)
    const [isFirstCreateTodo, setFirstCreateTodo] = useState(true)

    const handleToggleTodo = () => {
        setChecked(!checked)
        dispatch(toggleTodo(id))
        patchToggleTodo(id, { completed: !checked })
            .catch((err) => console.log('error patchTodoName', { err }))
            .finally(() => console.log('finished patchToggleTodo'))
    }

    const handleDeleteTodo = () => {
        dispatch(deleteTodo(id))
        deleteTodoData(id)
            .catch((err) => console.log('error deleteTodoData', { err }))
            .finally(() => console.log('finished deleteTodoData'))
    }

    // update name todo
    // Nếu lần đầu sẽ không chạy và setFirstCreateTodo = false
    useEffect(() => {
        if (!isFirstCreateTodo) {
            dispatch(updateNameTodo({ id, name: todoName }))
            patchTodoName(id, { name: todoName })
                .catch((err) => console.log('error patchTodoName', { err }))
                .finally(() => console.log('finished patchTodoName'))
        }
        setFirstCreateTodo(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id, todoName])

    return (
        <Col
            span={24}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
                ...(checked === true
                    ? {
                          textDecoration: 'line-through',
                          opacity: 0.7,
                      }
                    : {}),
            }}
        >
            <Checkbox checked={checked} onClick={handleToggleTodo}>
                <Paragraph
                    style={{ marginBottom: 0 }}
                    editable={{
                        onChange: setTodoName,
                        triggerType: 'text',
                    }}
                >
                    {todoName}
                </Paragraph>
            </Checkbox>
            <Row>
                <Tag color={colorPriorityMapping[priority]}>{priority}</Tag>
                <Tag style={{ cursor: 'pointer' }} onClick={handleDeleteTodo}>
                    Delete
                </Tag>
            </Row>
        </Col>
    )
}

export default Todo
