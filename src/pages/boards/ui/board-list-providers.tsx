import { subject, useAbility } from "@/features/auth";
import { BoardsListModelProvider } from "@/features/boards-list";

export function BoardListProvider({ children }: { children: React.ReactNode }) {
  const ability = useAbility();
  return (
    <BoardsListModelProvider
      deps={{
        canCreateBoard: () => ability.can("create", "Board"),
        canViewBoard: (board) => ability.can("read", subject("Board", board)),
        canUpdateBoard: (board) =>
          ability.can("update", subject("Board", board)),
        canRemoveBoard: (board) =>
          ability.can("delete", subject("Board", board)),
      }}
    >
      {children}
    </BoardsListModelProvider>
  );
}
