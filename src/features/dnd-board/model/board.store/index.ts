import { registerSlice } from "@/shared/lib/redux";
import { boardDndSlice } from "./slice";
import {
  loadBoard,
  removeColumn,
  removeBoardCard,
  updateBoardCard,
  addBoardCard,
} from "./thunks";
import { selectBoard, selectColumn } from "./selectors";
import { startSaveBoardListener } from "./listeners";

registerSlice([boardDndSlice]);
startSaveBoardListener();

const { addColumn, setBoard, moveColumn, updateColumn, moveBoardCard } =
  boardDndSlice.actions;

export const boardStore = {
  selectors: {
    selectBoard,
    selectColumn,
  },
  actions: {
    loadBoard,
    addBoardCard,
    updateBoardCard,
    removeColumn,
    removeBoardCard,
    addColumn,
    setBoard,
    moveColumn,
    updateColumn,
    moveBoardCard,
  },
};
