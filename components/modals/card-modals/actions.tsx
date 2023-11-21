"use client";

import { Copy, Trash } from "lucide-react";
import { CardWithList } from "@/types";
import { useAction } from '@/hooks/use-actions';
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionProps {
  data: CardWithList;
}
export function Actions({ data }: ActionProps) {
  const params = useParams();
  const cardModal = useCardModal();

 const { execute : executeCopyCard, loading : isLoadingCopy } = useAction(copyCard, {
  onSuccess : (data) => {
    toast.success(`Card "${data.title} copied."`);
    cardModal.onClose();
  },
  onError : (error) => toast.error(error)
 })

 const { execute : executeDeleteCard, 
  loading : isLoadingDelete } = useAction(deleteCard, {
    onSuccess : () => {
      toast.success(`Card "${data.title} deleted."`);
      cardModal.onClose();
    },
    onError : (error) => toast.error(error)
  })

 const onCopyCard = () => {
  const boardId = params.boardId as string;

  executeCopyCard({
    boardId,
    id : data.id
  });
 };

 const onDeleteCard = () => {
  const boardId = params.boardId as string;

  executeDeleteCard({
    boardId,
    id : data.id
  });
 }
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
      disabled={isLoadingCopy}
      onClick={onCopyCard}
      variant={"gray"} 
      size={"inline"} 
      className="w-full justify-start">
        <Copy className="h-4 w-4 mr-2"/>
        Copy
      </Button>
      <Button  
      disabled={isLoadingDelete}
      variant={"gray"} 
      size={"inline"} 
      onClick={onDeleteCard}
      className="w-full justify-start">
        <Trash className="h-4 w-4 mr-2"/>
        Remove
      </Button>
    </div>
  );
}

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
