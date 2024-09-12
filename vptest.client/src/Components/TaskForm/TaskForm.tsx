import React, { useState } from 'react';
import { TaskModel } from '../../Types/Task';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

interface TaskFormProps {
    onAddTask: (task: TaskModel) => Promise<Boolean>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const today = dayjs();
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = React.useState<Dayjs | null>(dayjs(today));
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (description.length < 11) {
            setError('tasks must be longer than 10 .');
            return;
        }

        setError('')
        setIsSubmitting(true);

        const result = await onAddTask({
            id: 0,
            description: description,
            deadline: deadline?.toDate() ?? new Date(),
            isDone: false
        });

        if (!result) {
            setError('Failed to add the task. Please try again.');
            setIsSubmitting(false);
            return;
        }

        setDescription('');
        setDeadline(today);
        setIsSubmitting(false);
    };

    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                height: 150,
                mt: 3,
                background: "white",
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <TextField
                required
                error={error.length > 0}
                helperText={error || ''}
                size="medium"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
            />
            <DatePicker
                label="DeadLine"
                value={deadline}
                format={"DD/MM/YYYY"}
                onChange={(newValue) => setDeadline(newValue)}
            />
            <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}>
                {isSubmitting ? 'Adding...' : 'Add Task'}
            </Button>
        </Box>
    );
};

export default TaskForm;
