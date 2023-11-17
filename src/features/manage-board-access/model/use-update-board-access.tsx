import { boardsStore } from "@/entities/board";
import { sessionStore } from "@/entities/session";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { BoardAccessInfo } from "./types";
import { useAction, useAppSelector } from "@/shared/lib/redux";

export type UpdateBoardAccessData = {
  editorsIds?: string[];
  ownerId: string;
};

export function useUpdateBoardAccess(boardId: string) {
  const getConfirmation = useGetConfirmation();
  const session = useAppSelector(sessionStore.selectors.selectSession);
  const updateBoardRaw = useAction(boardsStore.actions.updateBoard);

  return async (
    data: UpdateBoardAccessData,
    onUpdate: (boardAccessInfo: BoardAccessInfo) => void,
  ) => {
    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateBoardRaw({ id: boardId, ...data });
    onUpdate({ id: boardId, ...data });
  };
}
