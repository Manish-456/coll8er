"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/use-actions";
import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormSubmit } from "@/components/form/form-submit";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export function ListOptions({ data, onAddCard }: ListOptionsProps) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
      closeRef?.current?.click()
    },
    onError: (error) => toast.error(error),
  });
  
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied.`);
      closeRef?.current?.click()
    },
    onError: (error) => toast.error(error),
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeCopy({
      id,
      boardId,
    });
  };

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({
      id,
      boardId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
          onClick={onAddCard}
        >
          Add card
        </Button>
        <form action={onCopy}>
          <input type="text" id="id" value={data.id} name="id" hidden />
          <input
            type="text"
            id="boardId"
            value={data.boardId}
            name="boardId"
            hidden
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Duplicate &quot;{data.title}&quot;
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input type="text" id="id" name="id" value={data.id} hidden />
          <input
            type="text"
            id="boardId"
            name="boardId"
            value={data.boardId}
            hidden
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete &quot;{data.title}&quot;
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
