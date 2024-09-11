import axios from 'axios';
import { TaskModel } from "../Types/Task"

const API_URL = 'https://localhost:7204/api/task';

export interface ErrorType {
    error?: Record<string, any>;
    code?: number;
    log_trace?: string;
}

export const getTasks = async () => {
    return await axios.get(API_URL);
};

export const addTask = async (task: TaskModel) => {
    return await axios.post(API_URL, task);
};

export const updateTask = async (task: TaskModel) => {
    return await axios.put(`${API_URL}`, task);
};

export const deleteTask = async (id: number) => {
    return await axios.delete(`${API_URL}?id=${id}`);
};