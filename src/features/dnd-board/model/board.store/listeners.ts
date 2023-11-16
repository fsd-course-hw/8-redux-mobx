import { listenerMiddleware } from "@/shared/lib/redux";
import { boardDndSlice } from "./slice";
import { isAnyOf } from "@reduxjs/toolkit";
import { boardDndBaseSelector } from "./selectors";
import { boardsRepository } from "@/entities/board";

export const startSaveBoardListener = () => {
  listenerMiddleware.startListening({
    matcher: isAnyOf(
      boardDndSlice.actions.addBoardCard,
      boardDndSlice.actions.updateBoardCard,
      boardDndSlice.actions.removeBoardCard,
      boardDndSlice.actions.moveBoardCard,
      boardDndSlice.actions.addColumn,
      boardDndSlice.actions.updateColumn,
      boardDndSlice.actions.removeColumn,
      boardDndSlice.actions.moveColumn,
    ),
    effect: (_, listenerApi) => {
      const board = boardDndBaseSelector(listenerApi.getState()).board;
      if (!board) {
        return;
      }
      boardsRepository.saveBoard(board);
    },
  });
};
