import { UiTextField } from "@/shared/ui/ui-text-field";
import { boardSearchStore } from "../model/board-search.store";
import { useAction, useAppSelector } from "@/shared/lib/redux";

export function BoardSearch({ className }: { className?: string }) {
  const query = useAppSelector(boardSearchStore.selectors.selectQuery);
  const setQuery = useAction(boardSearchStore.actions.setQuery);

  return (
    <UiTextField
      className={className}
      inputProps={{
        placeholder: "Поиск",
        value: query,
        onChange: (e) => setQuery(e.target.value),
      }}
    />
  );
}
