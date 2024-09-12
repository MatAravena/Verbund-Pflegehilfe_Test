import { useEffect, useState } from 'react';
import './App.css';
import { TaskModel } from './Types/Task';
import { addTask, getTasks, deleteTask, updateTask, ErrorType } from './Services/TaskServices';
import TaskForm from './Components/TaskForm/TaskForm';
import TaskList from './Components/TaskList/TaskList';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
    const [listTasks, setListTasks] = useState<TaskModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {

        try {
            const tasks = await getTasks();

            if (tasks?.data?.length > 0)
                setListTasks(tasks.data);
            else
                setError('No tasks found')

        } catch (e) {
            setError('Failed to fetch tasks :' + e);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    //Actions
    const handleAddTask = async (newTask: TaskModel): Promise<Boolean> => {
        try {
            const result = await addTask(newTask);

            if ((result as ErrorType)?.error) {
                console.log('handleAddTask result', result)
                return false;
            }

            setListTasks(prevState => [...prevState as TaskModel[], newTask]);
            return true;

        } catch (err) {
            console.error('Error adding task:', err);
            setError('Failed to add task');
            return false;
        }
    };

    const handleDeleteTasks = async (id: number) => {
        try {
            const result = await deleteTask(id);

            if ((result as ErrorType)?.error) {
                console.log('handleDelete  result :', result)
                return;
            }

            setListTasks(listTasks?.filter(task => task.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
            setError('Failed to delete task');
        }
    };

    const handleUpdateTasks = async (task: TaskModel, toSaveInBD: boolean = true) => {
        try {
            // If not saving to the backend, only update the state
            if (!toSaveInBD) {
                setListTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? task : t)));
                return;
            }

            const result = await updateTask(task);

            if ((result as ErrorType)?.error) {
                console.log('handleUpdate result :', result)
                return;
            }

            //map improve logic and avoid possible re-render issues
            setListTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? task : t)));

        } catch (err) {
            console.error('Error updating task:', err);
            setError('Failed to update task');
        }
    };

    //Components to display
    const formComponent = !loading ?
        <TaskForm onAddTask={handleAddTask} />
        : <p><em>Loading... Please wait or refresh the page.</em></p>;

    const listComponent = loading ?
        <p><em>Loading tasks...</em></p>
        : listTasks.length > 0 ?
            <TaskList tasks={listTasks} onDeleteTask={handleDeleteTasks} onUpdateTask={handleUpdateTasks} />
            : <p><em>No tasks available.</em></p>;

    const displayError = error ? <p><br />{error}<br /></p> : <></>

    //Return HTML
    return (
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h1 id="tabelLabel">List of ToDos</h1>
                {displayError}
                {formComponent}
                <br />
                {listComponent}
            </LocalizationProvider>
        </div>
    );
}

export default App;
