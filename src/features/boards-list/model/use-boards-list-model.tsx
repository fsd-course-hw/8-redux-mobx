import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { BoardsListModel } from "./boards-list.model";
import { useMemo } from "react";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { BoardsListDeps } from "../deps";
import { useAppSelector } from "@/shared/lib/redux";
import { usersStore } from "@/entities/user";
import { sessionStore } from "@/entities/session";

const boardsListModelContext = createStrictContext<BoardsListModel>();

export const useBoardsListModel = () =>
  useStrictContext(boardsListModelContext);

export const BoardsListModelProvider = ({
  children,
  deps,
}: {
  deps: BoardsListDeps;
  children: React.ReactNode;
}) => {
  const getConfirmation = useGetConfirmation();
  const { canViewBoard, canRemoveBoard, canUpdateBoard, canCreateBoard } = deps;
  const usersMap = useAppSelector(usersStore.selectors.selectUsersMap);
  const session = useAppSelector(sessionStore.selectors.selectSession);

  const model = useMemo(
    () =>
      new BoardsListModel({
        usersMap,
        canViewBoard,
        canRemoveBoard,
        canUpdateBoard,
        canCreateBoard,
        getConfirmation,
        session,
      }),
    [
      session,
      canCreateBoard,
      canRemoveBoard,
      canUpdateBoard,
      canViewBoard,
      getConfirmation,
      usersMap,
    ],
  );
  return (
    <boardsListModelContext.Provider value={model}>
      {children}
    </boardsListModelContext.Provider>
  );
};
