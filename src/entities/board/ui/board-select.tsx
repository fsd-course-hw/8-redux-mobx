import { BoardPartial } from "@/entities/board";
import { UiSelect } from "@/shared/ui/ui-select-field";
import { boardsStore } from "../model/boards.store";
import { useAppSelector } from "@/shared/lib/redux";

export function BoardSelect({
  className,
  label,
  onChangeBoardId,
  boardId,
  required,
  error,
  filterOptions = () => true,
}: {
  error?: string;

  className?: string;
  boardId?: string;
  label?: string;
  onChangeBoardId: (id?: string) => void;
  required?: boolean;
  filterOptions?: (board: BoardPartial) => boolean;
}) {
  const board = useAppSelector((store) =>
    boardsStore.selectors.selectBoardById(store, boardId),
  );
  let boards = useAppSelector(boardsStore.selectors.selectBoards);
  boards = boards.filter(filterOptions);

  const options = required ? boards : [undefined, ...boards];

  const onChangeBoard = (board?: BoardPartial) => {
    onChangeBoardId(board?.id);
  };

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={board}
      onChange={onChangeBoard}
      getLabel={(board) => board?.title ?? ""}
    />
  );
}
