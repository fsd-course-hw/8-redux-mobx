import { BoardPartial } from "@/entities/board";
import { RemoveIcon } from "@/shared/ui/ui-icons";
import { useBoardsListModel } from "../model/use-boards-list-model";

export function RemoveBoardButton({ board }: { board: BoardPartial }) {
  const boardModel = useBoardsListModel();

  return (
    <button onClick={() => boardModel.removeBoard(board)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
