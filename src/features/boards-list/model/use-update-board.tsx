import { BoardPartial, UpdateBoardData, boardsStore } from "@/entities/board";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useBoardsListDeps } from "../deps";
import { sessionStore } from "@/entities/session";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";

export function useUpdateBoard(board?: BoardPartial) {
  const dispatch = useAppDispatch();
  const getConfirmation = useGetConfirmation();

  const { canUpdateBoard } = useBoardsListDeps();

  const ownerId = useAppSelector(
    (s) => sessionStore.selectors.selectSession(s)?.userId,
  );

  const updateBoard = async (data: UpdateBoardData, onUpdate: () => void) => {
    if (!board || !canUpdateBoard(board)) return;

    if (ownerId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await dispatch(boardsStore.actions.updateBoard({ ...data, id: board.id }));
    onUpdate();
  };

  return { updateBoard };
}
