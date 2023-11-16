import { BoardPartial } from "@/entities/board";

export type BoardsListDeps = {
  canCreateBoard: () => boolean;
  canViewBoard: (board: BoardPartial) => boolean;
  canRemoveBoard: (board: BoardPartial) => boolean;
  canUpdateBoard: (board: BoardPartial) => boolean;
};
