import {
  BoardPartial,
  CreateBoardData,
  UpdateBoardData,
  boardsStore,
} from "@/entities/board";
import { Session } from "@/entities/session";
import { User } from "@/entities/user";
import { GetConfirmation } from "@/shared/lib/confirmation";
import { makeAutoObservable } from "mobx";
import { BoardsListDeps } from "../deps";

interface BoardsListModelDeps extends BoardsListDeps {
  usersMap: Record<string, User>;
  session?: Session;
  getConfirmation: GetConfirmation;
}

export class BoardsListModel {
  constructor(private deps: BoardsListModelDeps) {
    makeAutoObservable(this);
  }

  get canCreateBoard() {
    return this.deps.canCreateBoard();
  }

  get canViewBoard() {
    return this.deps.canViewBoard;
  }

  canRemoveBoard(board: BoardPartial) {
    return this.deps.canRemoveBoard(board);
  }

  canUpdateBoard(board: BoardPartial) {
    return this.deps.canUpdateBoard(board);
  }

  get boardsList() {
    return boardsStore.boards.filter(this.deps.canViewBoard).map((board) => {
      return {
        ...board,
        owner: this.deps.usersMap[board.ownerId],
        editors: board.editorsIds.map((userId) => this.deps.usersMap[userId]),
      };
    });
  }

  async createBoard(data: CreateBoardData, onCreate: () => void) {
    if (!this.deps.canCreateBoard() || !this.deps.session?.userId) return;

    await boardsStore.createBoard({
      ...data,
      ownerId: this.deps.session.userId,
    });

    onCreate();
  }

  async updateBoard(
    board: BoardPartial,
    data: UpdateBoardData,
    onUpdate: () => void,
  ) {
    if (!board || !this.deps.canUpdateBoard(board)) return;

    if (this.deps.session?.userId !== data.ownerId) {
      const confirmation = await this.deps.getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await boardsStore.updateBoard({ ...data, id: board.id });
    onUpdate();
  }

  async removeBoard(board: BoardPartial) {
    const confirmation = await this.deps.getConfirmation({
      description: "Вы действительно хотите удалить доску?",
    });

    if (!confirmation || !this.deps.canRemoveBoard(board)) return;

    await boardsStore.removeBoard(board.id);
  }
}
