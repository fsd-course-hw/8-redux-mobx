import { UiTextField } from "@/shared/ui/ui-text-field";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBoardActions } from "../model/use-board-actions";

export function AddBoardCard({ colId }: { colId: string }) {
  const [create, setCreate] = useState(false);

  const { addBoardCard } = useBoardActions();
  const { register, handleSubmit, reset } = useForm<{ title: string }>({});

  if (!create) {
    return (
      <button
        className="h-10 p-2  hover:bg-teal-100/40 rounded flex items-center justify-center w-full "
        type="button"
        onClick={() => setCreate(true)}
      >
        Добавить +
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        addBoardCard({
          colId,
          title: data.title,
        });
        reset();
      })}
    >
      <UiTextField
        inputProps={{
          autoFocus: true,
          placeholder: "Новая карточка",
          ...register("title", {
            onBlur: () => setCreate(false),
          }),
        }}
      />
    </form>
  );
}
