import React, {useContext, useState, useEffect} from 'react'
import {TaskListContext} from '../context/TaskListContext'

const urlApi = 'https://assets.breatheco.de/apis/fake/todos/user/kanogl';

const TaskForm = () => {
    const { addTask, clearList, editItem, editTask  } = useContext(TaskListContext);

    const [title, setTitle] = useState('')

    const handleChange = e => {
        setTitle(e.target.value)
        console.log(title);
    };

    const handleSumbit = e => {
        e.preventDefault();
        if (!editItem) {
            addTask(title);
            setTitle('');

            const jsonql = JSON.stringify([
                { label: "make the bed", done: false },
                { label: "Walk the dog", done: false },
                { label: "Do the replits", done: false }
            ])

            console.log(jsonql)
            fetch(urlApi, {
                method: 'PUT',
                body: jsonql,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(responseAsJson => {
                    let result = 'task successfully added'
                    console.log(result);
                })
                .catch(error => {
                    console.log('parece que hay un error:', error);
                })
        } else {
            editTask(title, editItem.id);
        }
        
    };

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title);
            console.log(editItem);
        } else {
            setTitle('');
        }
    }, [editItem]);

    return (
        <form onSubmit={handleSumbit} className='form'>
            <input 
            onChange={handleChange}
            value={title}
            type='text'
            className='task-input'
            placeholder='Add Task'
            required />
            <div className='buttons'>
                <button type='submit' className='btn add-task-btn'>
                    {editItem ? 'Edit Task' : 'Add Task'}
                </button>
                <button onClick={clearList} className='btn clear-btn'>
                    Clear
                </button>
            </div>
        </form>
    )
}

export default TaskForm
