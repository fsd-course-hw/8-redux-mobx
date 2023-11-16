import { Board, BoardCard } from "@/entities/board";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export type BoardState = {
  board?: Board;
};

const initialState: BoardState = {
  board: undefined,
};

export const boardDndSlice = createSlice({
  name: "board-dnd",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      state.board = action.payload;
    },
    addColumn: (state, action: PayloadAction<{ title: string }>) => {
      state.board?.cols.push({
        id: nanoid(),
        title: action.payload.title,
        items: [],
      });
    },

    updateColumn: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const board = state.board;
      const { id, title } = action.payload;
      if (!board) return;

      const index = board.cols.findIndex((col) => col.id === id);
      board.cols[index].title = title;
    },

    removeColumn: (state, action: PayloadAction<{ id: string }>) => {
      const board = state.board;
      const { id } = action.payload;
      if (!board) return;

      const index = board.cols.findIndex((col) => col.id === id);
      board.cols.splice(index, 1);
    },

    moveColumn: (
      state,
      action: PayloadAction<{ newIndex: number; index: number }>,
    ) => {
      const board = state.board;
      const { index, newIndex } = action.payload;
      if (!board) return;
      const col = board.cols[index];
      board.cols.splice(index, 1);
      board.cols.splice(newIndex, 0, col);
    },

    addBoardCard: (
      state,
      action: PayloadAction<{ colId: string; boardCard: BoardCard }>,
    ) => {
      const board = state.board;
      const { colId, boardCard } = action.payload;
      if (!board) return;
      const index = board.cols.findIndex((col) => col.id === colId);
      board.cols[index].items.push(boardCard);
    },

    updateBoardCard: (
      state,
      action: PayloadAction<{ boardCard: BoardCard; colId: string }>,
    ) => {
      const board = state.board;
      const { colId, boardCard } = action.payload;
      if (!board) return;
      const index = board.cols.findIndex((col) => col.id === colId);
      const itemIndex = board.cols[index].items.findIndex(
        (item) => item.id === boardCard.id,
      );
      board.cols[index].items[itemIndex] = boardCard;
    },

    removeBoardCard: (
      state,
      action: PayloadAction<{ colId: string; boardCardId: string }>,
    ) => {
      const board = state.board;
      const { colId, boardCardId } = action.payload;
      if (!board) return;

      const index = board.cols.findIndex((col) => col.id === colId);
      const itemIndex = board.cols[index].items.findIndex(
        (item) => item.id === boardCardId,
      );
      board.cols[index].items.splice(itemIndex, 1);
    },

    moveBoardCard: (
      state,
      action: PayloadAction<{
        start: { colId: string; index: number };
        end: { colId: string; index: number };
      }>,
    ) => {
      const board = state.board;
      const { start, end } = action.payload;
      if (!board) return;

      const startColIndex = board.cols.findIndex(
        (col) => col.id === start.colId,
      );
      const endColIndex = board.cols.findIndex((col) => col.id === end.colId);

      const item = board.cols[startColIndex].items[start.index];
      board.cols[startColIndex].items.splice(start.index, 1);
      board.cols[endColIndex].items.splice(end.index, 0, item);
    },
  },
});
