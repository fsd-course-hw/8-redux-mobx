import { makeAutoObservable, runInAction } from "mobx";
import { nanoid } from "nanoid";
import { CreateBoardData, UpdateBoardData, BoardPartial } from "./types";
import { boardsRepository } from "./boards.repository";

export class BoardsStore {
  boards = [] as BoardPartial[];

  constructor() {
    makeAutoObservable(this);
  }

  async loadBoards() {
    const boards = await boardsRepository.getBoards();
    runInAction(() => {
      this.boards = boards;
    });
  }

  async createBoard(data: CreateBoardData) {
    const newBoard = { id: nanoid(), ...data, cols: [] };
    await boardsRepository.saveBoard(newBoard);
    runInAction(() => {
      this.boards.push(newBoard);
    });
  }

  async updateBoard(data: UpdateBoardData) {
    const board = await boardsRepository.getBoard(data.id);
    if (!board) {
      return;
    }
    const updatedBoard = { ...board, ...data };
    await boardsRepository.saveBoard(updatedBoard);
    runInAction(() => {
      const boardIndex = this.boards.findIndex((board) => board.id === data.id);
      this.boards[boardIndex] = updatedBoard;
    });
  }

  async removeBoard(boardId: string) {
    await boardsRepository.removeBoard(boardId);
    runInAction(() => {
      this.boards = this.boards.filter((board) => board.id !== boardId);
    });
  }

  async removeAuthorBoards(userId: string) {
    for (const board of this.boards) {
      const newEditorsIds = board.editorsIds.filter((id) => id !== userId);
      const newBoard = { ...board, editorsIds: newEditorsIds };

      if (board.ownerId === userId) {
        await this.removeBoard(board.id);
      } else {
        await this.updateBoard(newBoard);
      }
    }
  }

  getBoardById(id: string): BoardPartial | undefined {
    return this.boards.find((board) => board.id === id);
  }

  getBoards(): BoardPartial[] {
    return this.boards;
  }
}

// Usage:
export const boardsStore = new BoardsStore();
