"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-actions";
import { updateCard } from "@/actions/update-card";

interface HeaderProps {
    data : CardWithList
}
export function Header({data} : HeaderProps) {
    const queryClient = useQueryClient();
    const params = useParams();

   const {execute} = useAction(updateCard, {
    onSuccess : (response) => {
        queryClient.invalidateQueries({
            queryKey : ["card", response.id]
        });
        queryClient.invalidateQueries({
            queryKey : ["card-logs", response.id]
        });
        toast.success(`Card "${response.title}" renamed`);
        setTitle(response.title);
    },
    onError : (error) => toast.error(error) 
   })
   
    const inpRef = useRef<ElementRef<"input">>(null);
    const [title, setTitle] = useState(data.title);

    const onBlur = () => {
        inpRef?.current?.form?.requestSubmit()
    }

    const onSubmit = (formData : FormData) => {
        const title = formData.get("title") as string;

        if(title === data.title){
            return;
        }

        execute({
            title,
            boardId : params.boardId as string,
            id : data.id
        })

    }
    
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
            <FormInput 
            id="title"
            defaultValue={title}
            ref={inpRef}
            onBlur={onBlur}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
            />
            
        </form>
        <p className="text-sm text-muted-foreground">
            in list <span className="underline text-sky-700">{data?.list?.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton(){
    return (
        <div className="flex items-start gap-x-3 mb-6">
            <Skeleton className="h-6 w-6 mt-1 bg-neutral-200"/>
            <div className="">
                <Skeleton className="h-6 w-24 mb-1 bg-neutral-200" />
                <Skeleton className="h-4 w-12  bg-neutral-200" />
            </div>
        </div>
    )
}
