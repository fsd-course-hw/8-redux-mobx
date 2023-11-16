import { nanoid } from "nanoid";
import { Session } from "./types";
import { sessionRepository } from "./session.repository";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { createBaseSelector, registerSlice } from "@/shared/lib/redux";

type CreateSessionData = {
  name: string;
  avatarId: string;
  userId: string;
};

type SessionStore = {
  currentSession?: Session;
};

const initialState: SessionStore = {
  currentSession: undefined,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadSession.fulfilled, (state, action) => {
      state.currentSession = action.payload;
    });
    builder.addCase(removeSession.fulfilled, (state) => {
      state.currentSession = undefined;
    });
    builder.addCase(createSession.fulfilled, (state, action) => {
      state.currentSession = action.payload;
    });
  },
});

const loadSession = createAsyncThunk("session/loadSession", async () => {
  const session = await sessionRepository.getSession();
  return session;
});

const removeSession = createAsyncThunk("session/removeSession", async () => {
  await sessionRepository.clearSession();
  return;
});

const createSession = createAsyncThunk(
  "session/createSession",
  async (data: CreateSessionData) => {
    const newSession = { ...data, id: nanoid() };
    await sessionRepository.saveSession(newSession);
    return newSession;
  },
);

const baseSelector = createBaseSelector(sessionSlice);

registerSlice([sessionSlice]);

export const sessionStore = {
  actions: {
    loadSession,
    removeSession,
    createSession,
  },
  selectors: {
    selectSession: createSelector(baseSelector, (s) => s.currentSession),
  },
};
