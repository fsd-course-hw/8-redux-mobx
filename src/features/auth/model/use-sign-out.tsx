import { sessionStore } from "@/entities/session";
import { useAppDispatch } from "@/shared/lib/redux";

export function useSignOut() {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(sessionStore.actions.removeSession());
  };
}
