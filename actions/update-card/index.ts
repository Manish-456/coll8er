"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from './schema';
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data : InputType) : Promise<ReturnType> => {
    const {userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            error : "Unauthorized"
        }
    }

    const {id, boardId, ...values} = data;

    let updatedCard;

    try {
         updatedCard = await db.card.update({
            where : {
                id,
                list : {
                    board : {
                        orgId
                    }
                }
            }, 
            data : {
             ...values
            }
         })


         await createAuditLog({
            entityId : updatedCard.id,
            entityType : ENTITY_TYPE.CARD,
            entityTitle : updatedCard.title,
            action : ACTION.UPDATE
         });
         
    } catch (error) {
        return {
            error : "Failed to update card"
        }
    }

    revalidatePath(`/board/${boardId}`);
    
    return {data : updatedCard}
}

export const updateCard = createSafeAction(UpdateCard, handler);