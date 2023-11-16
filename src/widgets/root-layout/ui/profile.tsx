import { sessionStore } from "@/entities/session";
import { getAvatarUrl } from "@/entities/user";
import { useAppSelector } from "@/shared/lib/redux";

export function Profile() {
  const session = useAppSelector(sessionStore.selectors.selectSession);

  if (!session) return null;

  return (
    <div className="flex gap-2 items-center justify-end">
      <img className="w-8 h-8" src={getAvatarUrl(session.avatarId)} />
      <div className="text-lg">{session.name}</div>
    </div>
  );
}
