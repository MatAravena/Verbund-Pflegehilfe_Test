import { useEffect, useState } from 'react';
import './App.css';
import { TaskModel } from './Types/Task';
import { addTask, getTasks, deleteTask, updateTask, ErrorType } from './Services/TaskServices';
import TaskForm from './Components/TaskForm/TaskForm';
import TaskList from './Components/TaskList/TaskList';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
    const [listTasks, setListTasks] = useState<TaskModel[]>();

    const fetchTasks = async () => {
        const tasks = await getTasks();

        if (tasks && tasks.data.length > 0) {
            setListTasks(tasks.data);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    //Actions
    const handleAddTask = async (newTask: TaskModel): Promise<Boolean> => {

        const result = await addTask(newTask);

        if ((result as ErrorType)?.error) {
            console.log('handleAddTask result', result)
            return false;
        }

        setListTasks(prevState => [...prevState as TaskModel[], newTask]);
        return true;
    };

    const handleDelete = async (id: number) => {
        const result = await deleteTask(id);

        if ((result as ErrorType)?.error) {
            console.log('handleDelete  result', result)
            return;
        }
        setListTasks(listTasks?.filter(task => task.id !== id));
    };

    const handleUpdate = async (task: TaskModel) => {
        const result = await updateTask(task);

        if ((result as ErrorType)?.error) {
            console.log('handleUpdate result', result)
            return;
        }

        setListTasks(prevTasks => {
            return [...prevTasks?.filter(t => t.id !== task.id) ?? [], task];
        });
    };

    //Components to display
    const formComponent = listTasks ?
        <TaskForm onAddTask={handleAddTask} />
        : <p><em>Loading... Please wait a few seconds o refresh the page.</em></p>

    const listComponent = listTasks && listTasks.length > 0 ?
        <TaskList tasks={listTasks} onDeleteTask={handleDelete} onUpdateTask={handleUpdate} />
        : <p><em>Probably Back end is loading.</em></p>

    //Return HTML
    return (
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h1 id="tabelLabel">List of ToDos</h1>
                {formComponent}
                <br />
                {listComponent}
            </LocalizationProvider>
        </div>
    );
}

export default App;
