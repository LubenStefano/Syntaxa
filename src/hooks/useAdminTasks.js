import { request, updateField } from "../utils/request";
import { useCallback } from "react";

export function useAdminTasks() {
  const fetchAllSavedTasks = useCallback(async () => {
    try {
      const allTasks = await request.getAll("savedTasks");
      return allTasks;
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const updateTaskGrade = useCallback(async (id, grade) => {
    await updateField("savedTasks", id, "grade", grade);
  }, []);

  return { fetchAllSavedTasks, updateTaskGrade };
}
