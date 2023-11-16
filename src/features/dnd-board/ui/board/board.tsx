import clsx from "clsx";
import { BoardColumn } from "./board-column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoardActions } from "../../model/use-board-actions";
import { useAppSelector } from "@/shared/lib/redux";
import { boardStore } from "../../model/board.store";

export function Board({ className }: { className?: string }) {
  const board = useAppSelector(boardStore.selectors.selectBoard);
  const columns = board?.cols ?? [];

  const { moveBoardCard, moveColumn } = useBoardActions();

  return (
    <DragDropContext
      onDragEnd={(e) => {
        if (e.type === "column") {
          if (e.destination) {
            moveColumn({
              index: e.source.index,
              newIndex: e.destination.index,
            });
          }
        }
        if (e.type === "card") {
          if (e.destination) {
            moveBoardCard({
              start: {
                colId: e.source.droppableId,
                index: e.source.index,
              },
              end: {
                colId: e.destination.droppableId,
                index: e.destination.index,
              },
            });
          }
        }
      }}
    >
      <Droppable direction="horizontal" droppableId="board" type="column">
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            {...droppableProps}
            ref={innerRef}
            className={clsx("flex  bg-gray-100 rounded-xl p-4 px-2", className)}
          >
            {columns.map((col, index) => (
              <BoardColumn key={col.id} col={col} index={index} />
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
