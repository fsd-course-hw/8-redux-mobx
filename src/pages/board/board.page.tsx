import { Board, BoardActions, useFetchBoard } from "@/features/dnd-board";
import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useParams } from "react-router-dom";
import {
  BoardDepsProvider,
  TaskEditorProvider,
} from "./providers";
import { useAppSelector } from "@/shared/lib/redux";
import { sessionStore } from "@/entities/session";

export function BoardPage() {
  const params = useParams<"boardId">();
  const boardId = params.boardId;
  const sesson = useAppSelector(sessionStore.selectors.selectSession);

  const { board, isLoading } = useFetchBoard(boardId);

  if (!sesson) {
    return <div>Не авторизован</div>;
  }

  if (!board || isLoading) {
    return <UiPageSpinner />;
  }

  return (
    <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider sesson={sesson} />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
        <BoardActions className="shrink-0 mb-2" />
        <Board className="basis-0 grow" />
      </div>
    </ComposeChildren>
  );
}
