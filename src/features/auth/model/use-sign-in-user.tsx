import { sessionStore } from "@/entities/session";
import { User } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib/redux";

export function useSignInUser() {
  const dispatch = useAppDispatch();

  return (user: User) => {
    dispatch(
      sessionStore.actions.createSession({
        userId: user.id,
        ...user,
      }),
    );
  };
}
