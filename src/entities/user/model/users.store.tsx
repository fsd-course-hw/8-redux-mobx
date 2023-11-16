import { nanoid } from "nanoid";
import { User } from "./types";
import { usersRepository } from "./users.repository";
import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { createBaseSelector, registerSlice } from "@/shared/lib/redux";

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      usersAdapter.addOne(state, action.payload);
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      usersAdapter.removeOne(state, action.payload);
    });
  },
});

const usersBaseSelector = createBaseSelector(usersSlice);
const adapterSelectors = usersAdapter.getSelectors(usersBaseSelector);
const selectUsersMap = createSelector(adapterSelectors.selectAll, (users) =>
  users.reduce(
    (acc, user) => {
      acc[user.id] = user;
      return acc;
    },
    {} as Record<string, User>,
  ),
);

const loadUsers = createAsyncThunk("users/loadUsers", async () => {
  const users = await usersRepository.getUsers();

  return users;
});

const createUser = createAsyncThunk(
  "users/createUser",
  async (data: { name: string; avatarId: string }) => {
    const newUser = { id: nanoid(), ...data };
    await usersRepository.addUser(newUser);
    return newUser;
  },
);

const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId: string) => {
    await usersRepository.removeUser(userId);
    return userId;
  },
);

registerSlice([usersSlice]);

export const usersStore = {
  actions: {
    loadUsers,
    createUser,
    removeUser,
  },
  selectors: {
    ...adapterSelectors,
    selectUsersMap,
  },
  slice: usersSlice,
};
