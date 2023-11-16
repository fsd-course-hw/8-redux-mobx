import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useUsersLisetDesp } from "../deps";
import { useAppDispatch } from "@/shared/lib/redux";
import { usersStore } from "@/entities/user";

export function useRemoveUser() {
  const dispatch = useAppDispatch();

  const { onBeforeRemoveUser } = useUsersLisetDesp();
  const getConfirmation = useGetConfirmation();

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    onBeforeRemoveUser(userId);

    await dispatch(usersStore.actions.removeUser(userId));
  };
}
