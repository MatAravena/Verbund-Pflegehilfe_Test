import React, { useState, useMemo } from 'react';
import { TaskModel } from '../../Types/Task';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, Checkbox, IconButton, Stack } from '@mui/material';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

interface TaskListProps {
    tasks: TaskModel[];
    onDeleteTask: (id: number) => void;
    onUpdateTask: (task: TaskModel, saveInBD?: boolean) => void;
}

type TaskFilter = 'All' | 'Active' | 'Completed'

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onUpdateTask }) => {
    //const [listTasks, setListTasks] = useState<TaskModel[]>([]);
    const [filter, setFilter] = useState<TaskFilter>('All');
    const today = dayjs();


    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => dayjs(a.deadline).diff(dayjs(b.deadline)));
    }, [tasks]);

    const handleFilterChange = (newFilter: TaskFilter) => {
        setFilter(newFilter);
    };

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'Completed':
                return sortedTasks.filter(task => task.isDone);
            case 'Active':
                return sortedTasks.filter(task => !task.isDone);
            default:
                return sortedTasks;
        }
    }, [filter, sortedTasks]);

    const handleCheckStatus = (task: TaskModel) => {
        onUpdateTask({ ...task, isDone: !task.isDone }, false);
    };

    const formatDate = (dateStr: Date | undefined): string => {
        return dayjs(dateStr).isValid() ? dayjs(dateStr).format('DD-MM-YYYY') : 'No Deadline';
    };

    const displayButton = (filterStatus: TaskFilter) => filter === filterStatus ? 'contained' : 'outlined';

    const paintRows = (task: TaskModel): React.CSSProperties => {
        if (task.isDone || dayjs(task.deadline).isAfter(today)) return {};
        return {
            border: '2px groove red',
        }
    };

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
                {filteredTasks.map(task => (
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
                                <IconButton data-testid={'deleteButton' + task.id} aria-label="delete" title="Delete" onClick={() => onDeleteTask(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="update" title="Update" onClick={() => onUpdateTask(task, true)}>
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
