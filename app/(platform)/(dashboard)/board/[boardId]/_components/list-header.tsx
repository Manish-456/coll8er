import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { List } from "@prisma/client";
import { useEventListener } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-actions";
import { updateList } from "@/actions/update-list";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard : () => void;
}

export function ListHeader({ data, onAddCard }: ListHeaderProps) {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if(title === data.title) {
      return disableEditing();
    }
    execute({
      title,
      id,
      boardId,
    });
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      formRef?.current?.requestSubmit();
    }
  };

  const onBlur = () => formRef?.current?.requestSubmit()

  useEventListener("keydown", onKeyDown);

  useEffect(() => {
    setTitle(data.title)
  }, [data])

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={handleSubmit}
        ref={formRef}
        className="flex-1 px-[2px]">
          <input type="text" hidden id="id" name="id" value={data.id} />
          <input
            type="text"
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
          />
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            placeholder="Enter list title..."
            defaultValue={title}
            errors={fieldErrors}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input bg-transparent focus:bg-white transition truncate"
          />
          <button type="submit" hidden></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="text-sm w-full px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {data.title}
        </div>
      )}
      <ListOptions
       data={data}
       onAddCard={onAddCard}
      />
    </div>
  );
}
