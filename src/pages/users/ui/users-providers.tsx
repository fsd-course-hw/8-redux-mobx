import { boardsStore } from "@/entities/board";
import { sessionStore } from "@/entities/session";
import {
  SignInUserButton,
  SignOutButton,
  subject,
  useAbility,
} from "@/features/auth";
import { usersListDespContext } from "@/features/users-list";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";

export const UsersPageProviers = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(sessionStore.selectors.selectSession);

  const ability = useAbility();

  return (
    <usersListDespContext.Provider
      value={{
        onBeforeRemoveUser: async (userId) => {
          if (session?.userId === userId) {
            await dispatch(sessionStore.actions.removeSession());
          }
          await dispatch(boardsStore.actions.removeAuthorBoards({ userId }));
        },
        renderUserAuthAction: (user) => {
          const canSignIn = ability.can(
            "sign-in-as",
            subject("User", { id: user.id }),
          );

          const canSignOut = ability.can(
            "sign-out",
            subject("User", { id: user.id }),
          );

          if (canSignIn) return <SignInUserButton user={user} />;
          if (canSignOut) return <SignOutButton />;
        },
      }}
    >
      {children}
    </usersListDespContext.Provider>
  );
};
