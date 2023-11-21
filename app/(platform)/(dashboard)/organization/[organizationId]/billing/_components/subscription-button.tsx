'use client';

import { toast } from "sonner";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-actions";
import { useProModal } from "@/hooks/use-pro-modal";

interface SubscriptionButtonProps {
    isPro : boolean;
}

export function SubscriptionButton({isPro} : SubscriptionButtonProps){
    const proModal = useProModal();

    const {execute, loading} = useAction(stripeRedirect, {
       onSuccess : (data) => {
        window.location.href = data;
       },
       onError : (error) => toast.error(error)
    })

    const onClick = () => {
        if(!isPro){
         proModal.onOpen();        
        }else{
            execute({})
        }
    }
    return (
        <Button
        onClick={onClick}
        disabled={loading}
        variant={"primary"}>
            {isPro ? "Manage subscription" : "Upgrade to pro"}
        </Button>
    )
}