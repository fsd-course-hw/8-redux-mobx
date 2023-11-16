import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import { boardStore } from "./board.store";

export const useFetchBoard = (boardId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const board = useAppSelector(boardStore.selectors.selectBoard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId) {
      return;
    }

    setIsLoading(true);
    dispatch(boardStore.actions.loadBoard({ boardId })).finally(() => {
      setIsLoading(false);
    });
  }, [boardId, dispatch]);

  return { board, isLoading };
};
