import { CreateBoardData, boardsStore } from "@/entities/board";
import { useBoardsListDeps } from "../deps";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import { sessionStore } from "@/entities/session";

export function useCreateBoard() {
  const dispatch = useAppDispatch();
  const { canCreateBoard } = useBoardsListDeps();
  const ownerId = useAppSelector(
    (s) => sessionStore.selectors.selectSession(s)?.userId,
  );

  const createBoard = async (data: CreateBoardData, onCreate: () => void) => {
    if (!canCreateBoard() || !ownerId) return;

    await dispatch(boardsStore.actions.createBoard({ ...data, ownerId }));

    onCreate();
  };

  return { createBoard };
}
