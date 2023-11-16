import { nanoid } from "nanoid";
import { CreateTaskData, Task, UpdateTaskData } from "./types";
import { tasksRepository } from "./tasks.repository";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createBaseSelector, registerSlice } from "@/shared/lib/redux";

export type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeUserTasks: (state, action: PayloadAction<{ userId: string }>) => {
      state.tasks = state.tasks.filter(
        (task) => task.authorId !== action.payload.userId,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
  },
});

const tasksBaseSelector = createBaseSelector(tasksSlice);

const selectTaskById = createSelector(
  tasksBaseSelector,
  (_: unknown, id: string) => id,
  (state, id) => {
    return state.tasks.find((task) => task.id === id);
  },
);

const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  const tasks = await tasksRepository.getTasks();
  return tasks;
});

const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: CreateTaskData) => {
    const newTask = { id: nanoid(), ...data, cols: [] };
    await tasksRepository.saveTask(newTask);
    return newTask;
  },
);

const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (data: UpdateTaskData, { getState }) => {
    const task = selectTaskById(getState(), data.id);
    if (!task) {
      throw new Error();
    }
    const newTask = { ...task, ...data };
    await tasksRepository.saveTask(newTask);
    return newTask;
  },
);

const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (taskId: string) => {
    await tasksRepository.removetask(taskId);
    return taskId;
  },
);

registerSlice([tasksSlice]);

export const tasksStore = {
  actions: {
    loadTasks,
    createTask,
    updateTask,
    removeTask,
    removeUserTasks: tasksSlice.actions.removeUserTasks,
  },
  selectors: {
    taskById: selectTaskById,
    tasks: createSelector(tasksBaseSelector, (s) => s.tasks),
  },
};
