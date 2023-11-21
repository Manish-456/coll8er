"use client";

import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { AlignLeft } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-actions";
import { updateCard } from "@/actions/update-card";

interface DescriptionProps {
  data: CardWithList;
}

export function Description({ data }: DescriptionProps) {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef?.current?.focus();
    });
  };

  const disableEditing = () => setIsEditing(false);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey : ["card-logs", data.id]
    });
      toast.success(`Card "${data.title}" updated.`);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    
    execute({
      description,
      id: data.id,
      boardId,
    });
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef}>
            <FormTextarea
              id="description"
              className="w-full mt-2"
              errors={fieldErrors}
              placeholder="Add a more detailed description"
              defaultValue={data.description || undefined}
            />

            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                onClick={disableEditing}
                type="button"
                size={"sm"}
                variant={"ghost"}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-2 px-3.5 rounded-md"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full mb-2 bg-neutral-200" />
      </div>
    </div>
  );
};
