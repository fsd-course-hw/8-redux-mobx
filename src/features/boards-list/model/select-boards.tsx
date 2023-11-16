import { boardsStore } from "@/entities/board";
import { usersStore } from "@/entities/user";
import { createSelector } from "reselect";

export const selectBoards = createSelector(
  boardsStore.selectors.selectBoards,
  usersStore.selectors.selectUsersMap,
  (boards, users) => {
    return boards.map((board) => {
      return {
        ...board,
        owner: users[board.ownerId],
        editors: board.editorsIds.map((userId) => users[userId]),
      };
    });
  },
);
