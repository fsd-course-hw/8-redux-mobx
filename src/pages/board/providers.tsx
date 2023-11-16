import { Board as BoardType } from "@/entities/board";
import { Session } from "@/entities/session";
import { tasksStore } from "@/entities/task";
import {
  boardDepsContext,
} from "@/features/dnd-board";
import {
  updateTaskModalDeps,
  useUpdateTaskModal,
} from "@/features/update-task-modal";
import { useAppDispatch } from "@/shared/lib/redux";

export function TaskEditorProvider({
  children,
  board,
}: {
  children?: React.ReactNode;
  board: BoardType;
}) {
  return (
    <updateTaskModalDeps.Provider
      value={{
        canAssigneUserToTask: (user) =>
          board.ownerId === user.id || board.editorsIds.includes(user.id),
      }}
    >
      {children}
    </updateTaskModalDeps.Provider>
  );
}

export function BoardDepsProvider({
  children,
  sesson,
}: {
  children?: React.ReactNode;
  sesson: Session;
}) {
  const dispatch = useAppDispatch();

  const { modal, updateTask } = useUpdateTaskModal();

  return (
    <boardDepsContext.Provider
      value={{
        createBoardCard: async (title: string) => {
          return await dispatch(tasksStore.actions.createTask({ title, authorId: sesson.userId })).unwrap()
        },
        onBeforeRemoveBoardCard: async (id: string) => {
          await dispatch(tasksStore.actions.removeTask( id ));
        },
        updateBoardCard: async (board) => {
          return await updateTask(board.id);
        },
      }}
    >
      {children}
      {modal}
    </boardDepsContext.Provider>
  );
}

