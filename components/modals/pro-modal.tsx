"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-actions";
import { stripeRedirect } from "@/actions/stripe-redirect";

export const ProModal = () => {
  const proModal = useProModal();

  const {execute, loading} = useAction(stripeRedirect, {
    onSuccess : (data) => {
      window.location.href = data;
    },
    onError : (error) => {
      toast.error(error)
    }
  });

  const onClick = () => execute({});

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
           src={"/hero.svg"}
            alt="hero"
             className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
            <h2 className="font-semibold text-xl">Upgrade to Coll8er Pro Now!</h2>
            <p className="text-xs font-semibold text-neutral-600">Explore the best of Coll8er</p>
            <div className="pl-3">
                <ul className="text-sm list-disc">
                    <li>Unlimited boards creation</li>
                    <li>Advanced checklists</li>
                    <li>Admin and Security features</li>
                    <li>Integration Capabilities</li>
                    <li>And more!</li>
                </ul>
            </div>
            <Button 
            onClick={onClick} 
            disabled={loading} 
            className="w-full" 
            variant={"primary"}>Upgrade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
