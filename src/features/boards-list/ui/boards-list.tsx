import { AvatarsList, UserPreview } from "@/entities/user";
import { ROUTER_PATHS } from "@/shared/constants";
import { Link, generatePath } from "react-router-dom";
import { UpdateBoardButton } from "./update-board-button";
import { RemoveBoardButton } from "./remove-board-button";
import { useBoardsListModel } from "../model/use-boards-list-model";
import { observer } from "mobx-react-lite";

const boardUrl = (boardId: string) =>
  generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.BOARD, { boardId });

export const BoardsList = observer(function BoardsList({
  className,
}: {
  className?: string;
}) {
  const boardsListModel = useBoardsListModel();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Название:</th>
            <th className="text-start">Админ:</th>
            <th className="text-start">Редакторы:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {boardsListModel.boardsList.map((board) => (
            <tr key={board.id} className="px-5 py-2 border-b border-b-slate-3 ">
              <td className="p-2">
                <Link to={boardUrl(board.id)} className="text-xl text-blue-500">
                  {board.title}
                </Link>
              </td>
              <td className="p-2">
                <UserPreview size="md" {...board.owner} />
              </td>
              <td className="p-2">
                <AvatarsList
                  avatarsIds={board.editors.map((editor) => editor.avatarId)}
                />
              </td>
              <td className="p-2">
                <div className="flex gap-2 ml-auto">
                  {boardsListModel.canUpdateBoard(board) && (
                    <UpdateBoardButton board={board} />
                  )}
                  {boardsListModel.canRemoveBoard(board) && (
                    <RemoveBoardButton board={board} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
