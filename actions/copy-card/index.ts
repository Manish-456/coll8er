"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from './schema';
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data : InputType) : Promise<ReturnType> => {
    const {userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            error : "Unauthorized"
        }
    }

    const {id, boardId} = data;

    let card;

    try {
     const cardToCopy = await db.card.findUnique({
        where : {
            id,
            list : {
                board :{
                    orgId
                }
            }
        }
     });

     if(!cardToCopy) {
        return {
            error : "failed to copy card."
        }
     }

     const lastCard = await db.card.findFirst({
          where : {
            list : {
                id : cardToCopy.listId
            }
          },
          orderBy : {
            order : "desc"
          },
          select : {
            order : true
          }
     });

     const newCardOrder = lastCard?.order ? lastCard.order + 1 : 1;

     card = await db.card.create({
        data : {
            title : `${cardToCopy.title} - copy`,
            description : cardToCopy.description,
            listId : cardToCopy.listId,
            order : newCardOrder
        }
     })

     await createAuditLog({
        entityId : card.id,
        entityType : ENTITY_TYPE.CARD,
        entityTitle : card.title,
        action : ACTION.CREATE
     });
     
    } catch (error) {
        return {
            error : "Failed to copy"
        }
    }

    revalidatePath(`/board/${boardId}`);  
    return {data : card}
}

export const copyCard = createSafeAction(CopyCard, handler);