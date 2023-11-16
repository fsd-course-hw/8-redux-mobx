import { createBaseSelector } from "@/shared/lib/redux";
import { boardDndSlice } from "./slice";
import { createSelector } from "@reduxjs/toolkit";

export const boardDndBaseSelector = createBaseSelector(boardDndSlice);

export const selectBoard = createSelector(boardDndBaseSelector, (b) => b.board);
export const selectColumn = createSelector(
  selectBoard,
  (_: unknown, id: string) => id,
  (board, id) => board?.cols.find((col) => col.id === id),
);
