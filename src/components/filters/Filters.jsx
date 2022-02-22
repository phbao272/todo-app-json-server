import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Input, Radio, Select, Tag } from 'antd'

import {
    searchTextChange,
    statusFilterChange,
    prioritiesFilterChange,
} from './FiltersSlice'

const { Option } = Select

const Filters = () => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('')
    const [status, setStatus] = useState('All')
    const [priorities, setPriorities] = useState([])

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
        dispatch(searchTextChange(e.target.value))
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
        dispatch(statusFilterChange(e.target.value))
    }

    const handlePrioritiesChange = (value) => {
        setPriorities(value)
        dispatch(prioritiesFilterChange(value))
    }

    return (
        <div id="filters">
            <div className="search-filter">
                <Typography.Paragraph
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 7,
                        marginTop: 10,
                    }}
                >
                    Search
                </Typography.Paragraph>
                <Input.Search
                    placeholder="Input search ..."
                    value={searchText}
                    onChange={handleSearchTextChange}
                />
            </div>
            <div className="status-filter">
                <Typography.Paragraph
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 7,
                        marginTop: 10,
                    }}
                >
                    Filter By Status
                </Typography.Paragraph>
                <Radio.Group value={status} onChange={handleStatusChange}>
                    <Radio value="All">All</Radio>
                    <Radio value="Completed">Completed</Radio>
                    <Radio value="Todo">To do</Radio>
                </Radio.Group>
            </div>
            <div className="priority-filter">
                <Typography.Paragraph
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 7,
                        marginTop: 10,
                    }}
                >
                    Filter By Priority
                </Typography.Paragraph>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select priorities"
                    value={priorities}
                    onChange={handlePrioritiesChange}
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
            </div>
        </div>
    )
}

export default Filters
