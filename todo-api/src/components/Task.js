import React, {useContext} from 'react'
import {TaskListContext} from '../context/TaskListContext'

const Task = ({task}) => {

    const {removeTask, findItem} = useContext(TaskListContext)

    return (
        <li className='list-item'>
            <span>
                {task.title}
                <div>
                    <button onClick={() => removeTask(task.id)} className='btn-delete task-btn'>
                        <i class="fa fa-trash"></i>
                    </button>
                    <button onClick={() => findItem(task.id)} className='btn-edit task-btn'>
                        <i className='fa fa-pencil'></i>
                    </button>
                </div>
            </span>
        </li>
    )
}

export default Task;
