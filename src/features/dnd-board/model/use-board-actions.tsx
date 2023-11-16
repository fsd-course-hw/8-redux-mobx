import { useAction, useActionWithDeps } from "@/shared/lib/redux";
import { boardStore } from "./board.store";
import { useBoardDeps } from "../deps";
import { useGetConfirmation } from "@/shared/lib/confirmation";

export const useBoardActions = () => {
  const deps = useBoardDeps();
  const getConfirmation = useGetConfirmation();

  const removeBoardCard = useActionWithDeps(
    boardStore.actions.removeBoardCard,
    {
      onBeforeRemoveBoardCard: deps.onBeforeRemoveBoardCard,
      getConfirmation,
    },
  );

  const updateBoardCard = useActionWithDeps(
    boardStore.actions.updateBoardCard,
    {
      updateBoardCard: deps.updateBoardCard,
    },
  );

  const addBoardCard = useActionWithDeps(boardStore.actions.addBoardCard, {
    createBoardCard: deps.createBoardCard,
  });
  const moveBoardCard = useAction(boardStore.actions.moveBoardCard);

  const addColumn = useAction(boardStore.actions.addColumn);
  const removeColumn = useActionWithDeps(boardStore.actions.removeColumn, {
    getConfirmation,
  });
  const updateColumn = useAction(boardStore.actions.updateColumn);
  const moveColumn = useAction(boardStore.actions.moveColumn);

  return {
    addBoardCard,
    updateBoardCard,
    moveBoardCard,
    removeBoardCard,
    addColumn,
    updateColumn,
    moveColumn,
    removeColumn,
  };
};
