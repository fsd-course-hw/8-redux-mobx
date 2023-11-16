import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { BoardCard } from "@/entities/board";

export type BoardDeps = {
  createBoardCard: (title: string) => Promise<BoardCard>;
  updateBoardCard: (boardCard: BoardCard) => Promise<BoardCard | undefined>;
  onBeforeRemoveBoardCard: (boardCard: string) => Promise<void>;
};

export const boardDepsContext = createStrictContext<BoardDeps>();

export const useBoardDeps = () => {
  return useStrictContext(boardDepsContext);
};
