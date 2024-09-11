import React, { useState, useEffect } from 'react';
import { TaskModel } from '../../Types/Task';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, Checkbox, IconButton, Stack } from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

interface TaskListProps {
    tasks: TaskModel[];
    onDeleteTask: (id: number) => void;
    onUpdateTask: (task: TaskModel) => void;
}

type taskStates = 'All' | 'Active' | 'Completed'

const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
    const { tasks, onDeleteTask, onUpdateTask } = props;
    const [listTasks, setListTasks] = useState<TaskModel[]>([]);
    const [filter, setFilter] = useState<taskStates>('All');

    const today: Date = new Date(Date.now());

    useEffect(() => {

        const fetchTasks = async () => {
            setListTasks(tasks)
            handleFilterChange(filter);
        };

        fetchTasks();
    }, [tasks]);

    const sortListTasks = (): TaskModel[] => {
        return listTasks.sort((a: TaskModel, b: TaskModel) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    }

    const handleFilterChange = (filterValue: taskStates) => {
        setFilter(filterValue);

        switch (filterValue) {
            case 'Completed':
                setListTasks(tasks.filter(task => task.isDone));
                break;
            case 'Active':
                setListTasks(tasks.filter(task => !task.isDone));
                break;
            default:
                setListTasks(tasks);
                break;
        }
    };

    const handleCheckStatus = (_task: TaskModel) => {
        var taskUpdated = listTasks.find(t => t.id == _task.id)

        if (taskUpdated == undefined) return;

        taskUpdated.isDone = !taskUpdated?.isDone
        setListTasks([...listTasks as TaskModel[]])
    };

    const formatDate = (dateStr: Date | undefined): string => {
        return dayjs(dateStr).format('dddd DD, MMMM, YYYY');
    };

    const displayButton = (filterStatus: string) => { return filter === filterStatus ? 'contained' : 'outlined' }

    const paintRows = (task: TaskModel): React.CSSProperties => {
        if (task.isDone || dayjs(task.deadline) > dayjs(today)) return {}
        return {
            border: 'groove red',
            borderRadius: '1px'
        }
    }

    return (
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Deadline</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortListTasks().map(task => (
                    <TableRow key={task.id} style={paintRows(task)}>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{formatDate(task.deadline)}</TableCell>
                        <TableCell>
                            <Checkbox
                                checked={!!task.isDone}
                                onChange={() => handleCheckStatus(task)}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            /> {task.isDone.toString()}
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" spacing={1}>
                                <IconButton aria-label="delete" title="Delete" onClick={() => onDeleteTask(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="update" title="Update" onClick={() => onUpdateTask(task)}>
                                    <UpdateIcon />
                                </IconButton>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow className="footer">
                    <TableCell>{tasks.length} items left</TableCell>
                    <TableCell colSpan={3}>
                        <Button size="small"
                            variant={displayButton('All')}
                            onClick={() => handleFilterChange('All')}>
                            All
                        </Button>
                        <Button size="small"
                            variant={displayButton('Completed')}
                            onClick={() => handleFilterChange('Completed')}>
                            Completed
                        </Button>
                        <Button size="small"
                            variant={displayButton('Active')}
                            onClick={() => handleFilterChange('Active')}>
                            Pending
                        </Button>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default TaskList;
