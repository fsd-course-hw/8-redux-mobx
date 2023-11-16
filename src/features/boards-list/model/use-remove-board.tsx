import { useGetConfirmation } from "@/shared/lib/confirmation";
import { BoardPartial, boardsStore } from "@/entities/board";
import { useBoardsListDeps } from "../deps";
import { useAppDispatch } from "@/shared/lib/redux";

export function useRemoveBoard() {
  const dispatch = useAppDispatch();
  const getConfirmation = useGetConfirmation();
  const { canRemoveBoard } = useBoardsListDeps();

  return async (board: BoardPartial) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить доску?",
    });

    if (!confirmation || !canRemoveBoard(board)) return;

    await dispatch(boardsStore.actions.removeBoard(board.id));
  };
}
