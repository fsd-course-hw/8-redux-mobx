import { usersStore } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib/redux";

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};

export function useCreateUser() {
  const dispatch = useAppDispatch();
  return (data: CreateUserFormData) => {
    dispatch(usersStore.actions.createUser(data));
  };
}
