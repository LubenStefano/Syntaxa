import { useState, useEffect } from "react";
import { request } from "../utils/request";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await request.getAll("tasks");
      setTasks(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const createTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      await request.createTask(taskData);
      await fetchAllTasks(); // Refresh tasks after creation
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskById = async (taskId) => {
    setIsLoading(true);
    setError(null);
    try {
      const task = await request.getById("tasks", taskId);
      return task;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { tasks, isLoading, error, fetchAllTasks, createTask, getTaskById };
};
