import React, { createContext, useState, useEffect } from 'react';
import {v1 as uuid } from 'uuid';
const urlApi = 'https://assets.breatheco.de/apis/fake/todos/user/kanogl';
export const TaskListContext = createContext();

const TaskListContextProvider = props => {
    const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

    const [tasks, setTasks] = useState(initialState);

    

const [editItem, setEditItem] = useState(null);

useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))

    const newList = []
    fetch(urlApi, {
        method: 'post',
        body: JSON.stringify(newList)
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(responseAsJson => {
            let result = 'ok'
            console.log(result);
        })
        .catch(error => {
            console.log('parece que hay un error:', error);
        })
    
    fetch(urlApi, {
        method: 'get',
        body: [
            { label: "Make the bed", done: false },
            { label: "Walk the dog", done: false },
            { label: "Do the replits", done: false }
        ]
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(responseAsJson => {
            setTasks([...tasks, ...responseAsJson])
            console.log(tasks);
        })
        .catch(error => {
            console.log('parece que hay un error:', error);
        })

    
    

}, [tasks]);

const addTask = (title) => {
    const newTask = [...tasks, { title, id: uuid() }]
    setTasks(newTask)

}

const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
}

const clearList = () => {
    setTasks([])
    fetch(urlApi, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'}
    }).then(responseAsJson => {
        setTasks([]);
        console.log('User & tasks delted');
    })
    .catch(error => console.log('Error:', error));
}

const findItem = id => {
    const item = tasks.find(task => task.id === id)

    setEditItem(item);
}

const editTask = (title, id) => {
    const newTasks = tasks.map(task => (task.id === id ) ? {title, id} : task);

    setTasks(newTasks);
    setEditItem(null);
}

    return (
        <TaskListContext.Provider value={{ tasks, addTask, removeTask, clearList, findItem, editTask, editItem, urlApi }}>
            {props.children}
        </TaskListContext.Provider>
    );
};

export default TaskListContextProvider;
