import { usersStore } from "@/entities/user";
import { BoardAccessInfo } from "./types";
import { useAppSelector } from "@/shared/lib/redux";

export function useBoardEditors(board: BoardAccessInfo) {
  const usersMap = useAppSelector(usersStore.selectors.selectEntities);

  const editors = board.editorsIds?.map((id) => usersMap[id]);
  const editorsWithOwner = board
    ? Array.from(new Set([board.ownerId, ...(board?.editorsIds ?? [])])).map(
        (id) => usersMap[id],
      )
    : undefined;

  const owner = board?.ownerId ? usersMap[board?.ownerId] : undefined;

  return { editors, editorsWithOwner, owner };
}
