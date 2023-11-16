import { boardsStore } from "@/entities/board";
import { sessionStore } from "@/entities/session";
import { tasksStore } from "@/entities/task";
import { usersStore } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib/redux";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";

export function AppLoader({ children }: { children?: ReactNode }) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      dispatch(usersStore.actions.loadUsers()),
      dispatch(sessionStore.actions.loadSession()),
      dispatch(boardsStore.actions.loadBoards()),
      dispatch(tasksStore.actions.loadTasks()),
    ]).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  return <>{children}</>;
}
