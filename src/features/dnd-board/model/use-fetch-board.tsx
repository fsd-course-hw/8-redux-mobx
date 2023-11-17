import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import { boardStore } from "./board.store";
import { boardSearchStore } from "./board-search.store";

export const useFetchBoard = (boardId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const board = useAppSelector(boardStore.selectors.selectBoard);

  const dispatch = useAppDispatch();

  const fetch = useCallback(async () => {
    if (!boardId) {
      return;
    }

    dispatch(boardSearchStore.actions.resetQuery());
    await dispatch(boardStore.actions.loadBoard({ boardId }));
  }, [boardId, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetch().finally(() => {
      setIsLoading(false);
    });
  }, [fetch]);

  return { board, isLoading, fetch };
};
