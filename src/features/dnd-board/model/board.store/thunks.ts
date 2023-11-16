import { BoardCard, boardsRepository } from "@/entities/board";
import { GetConfirmation } from "@/shared/lib/confirmation";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardDndSlice } from "./slice";
import { BoardDeps } from "../../deps";

export const loadBoard = createAsyncThunk(
  "board/loadBoard",
  async ({ boardId }: { boardId: string }, { dispatch }) => {
    const board = await boardsRepository.getBoard(boardId);
    if (!board) {
      return;
    }
    dispatch(boardDndSlice.actions.setBoard(board));
    return board;
  },
);

export const removeColumn = createAsyncThunk(
  "board/removeColumn",
  async (
    { id, deps }: { id: string; deps: { getConfirmation: GetConfirmation } },
    { dispatch },
  ) => {
    const confirmation = await deps.getConfirmation({
      title: "Удаление колонки",
      description: "Вы уверены, что хотите удалить колонку?",
    });
    if (!confirmation) {
      return;
    }

    dispatch(boardDndSlice.actions.removeColumn({ id }));
  },
);

export const removeBoardCard = createAsyncThunk(
  "board/removeBoardCard",
  async (
    {
      colId,
      boardCardId,
      deps,
    }: {
      colId: string;
      boardCardId: string;
      deps: {
        getConfirmation: GetConfirmation;
        onBeforeRemoveBoardCard: BoardDeps["onBeforeRemoveBoardCard"];
      };
    },
    { dispatch },
  ) => {
    const confirmation = await deps.getConfirmation({
      title: "Удаление карточки",
      description: "Вы уверены, что хотите удалить карточку?",
    });

    if (!confirmation) {
      return;
    }

    await deps.onBeforeRemoveBoardCard(boardCardId);

    dispatch(boardDndSlice.actions.removeBoardCard({ colId, boardCardId }));
  },
);

export const addBoardCard = createAsyncThunk(
  "board/addBoardCard",
  async (
    {
      colId,
      title,
      deps,
    }: {
      colId: string;
      title: string;
      deps: {
        createBoardCard: BoardDeps["createBoardCard"];
      };
    },
    { dispatch },
  ) => {
    const boardCard = await deps.createBoardCard(title);
    if (!boardCard) return;
    dispatch(boardDndSlice.actions.addBoardCard({ colId, boardCard }));
  },
);

export const updateBoardCard = createAsyncThunk(
  "board/updateBoardCard",
  async (
    {
      colId,
      boardCard,
      deps,
    }: {
      colId: string;
      boardCard: BoardCard;
      deps: {
        updateBoardCard: BoardDeps["updateBoardCard"];
      };
    },
    { dispatch },
  ) => {
    const newBoardCard = await deps.updateBoardCard(boardCard);
    if (!newBoardCard) return;
    dispatch(
      boardDndSlice.actions.updateBoardCard({ colId, boardCard: newBoardCard }),
    );
  },
);
