import { useUser } from "../context/UserContext";
import { request } from "../utils/request";

export function useSaveTask() {
  const { user } = useUser();

  async function saveTask(taskName, html, css, js) {
    if (!user) {
      throw new Error("User is not logged in.");
    }

    if (!taskName) {
      taskName = prompt("Please enter a task name:");
      if (!taskName) {
        throw new Error("Task name is required.");
      }
    }

    const solvedTask = {
      dateCreated: new Date().toISOString(),
      taskName,
      studentId: user.id,
      studentName: `${user.firstName} ${user.lastName}`,
      html,
      css,
      js,
      grade: null, // Grade will be set later by the admin
    };

    return request.create("savedTasks", solvedTask);
  }

  async function saveSandboxTask(html, css, js, taskName = null) {
    if (!user) {
      throw new Error("User is not logged in.");
    }

    if (!taskName) {
      taskName = prompt("Please enter a task name for your sandbox task:");
      if (!taskName) {
        throw new Error("Task name is required.");
      }
    }

    const sandboxTask = {
      dateCreated: new Date().toISOString(),
      taskName,
      studentId: user.id,
      studentName: `${user.firstName} ${user.lastName}`,
      html,
      css,
      js,
      grade: null, // Grade will be set later by the admin
    };

    return request.create("savedTasks", sandboxTask);
  }

  async function fetchSavedTasks() {
    if (!user) {
      throw new Error("User is not logged in.");
    }

    const allTasks = await request.getAll("savedTasks");
    return allTasks.filter((task) => task.studentId === user.id);
  }

  return { saveTask, saveSandboxTask, fetchSavedTasks };
}
