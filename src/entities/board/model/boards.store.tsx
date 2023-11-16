import { nanoid } from "nanoid";
import { CreateBoardData, BoardPartial, UpdateBoardData } from "./types";
import { boardsRepository } from "./boards.repository";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { createBaseSelector, registerSlice } from "@/shared/lib/redux";

export type BoardsState = {
  boards: BoardPartial[];
};

const initialState: BoardsState = {
  boards: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload);
    });
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.id) {
          return action.payload;
        }
        return board;
      });
    });
    builder.addCase(removeBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload,
      );
    });
  },
});

const boardsBaseSelector = createBaseSelector(boardsSlice);

const selectBoardById = createSelector(
  boardsBaseSelector,
  (_: unknown, id?: string) => id,
  (state, id) => {
    if (!id) {
      return;
    }
    return state.boards.find((board) => board.id === id);
  },
);
const selectBoards = createSelector(boardsBaseSelector, (s) => s.boards);

const loadBoards = createAsyncThunk("boards/loadboards", async () => {
  const boards = await boardsRepository.getBoards();
  return boards;
});

const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (data: CreateBoardData) => {
    const newBoard = { id: nanoid(), ...data, cols: [] };
    await boardsRepository.saveBoard(newBoard);
    return newBoard;
  },
);

const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (data: UpdateBoardData) => {
    const board = await boardsRepository.getBoard(data.id);
    if (!board) {
      throw new Error();
    }
    const newBoard = { ...board, ...data };
    await boardsRepository.saveBoard(newBoard);
    return newBoard;
  },
);

const removeBoard = createAsyncThunk(
  "boards/removeBoard",
  async (boardId: string) => {
    await boardsRepository.removeBoard(boardId);
    return boardId;
  },
);

const removeAuthorBoards = createAsyncThunk(
  "boards/removeAuthorBoards",
  async ({ userId }: { userId: string }, { getState, dispatch }) => {
    const state = boardsBaseSelector(getState());

    for await (const board of state.boards) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter((id) => id !== userId),
      };

      if (board.ownerId === userId) {
        await dispatch(removeBoard(board.id));
      } else {
        await dispatch(updateBoard(newBoard));
      }
    }
  },
);

registerSlice([boardsSlice]);

export const boardsStore = {
  actions: {
    loadBoards,
    createBoard,
    updateBoard,
    removeBoard,
    removeAuthorBoards,
  },
  selectors: {
    selectBoardById,
    selectBoards,
  },
};
