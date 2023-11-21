"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data : InputType) : Promise<ReturnType> => {
    const {userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            error : "Unauthorized"
        }
    }

    const {id, title} = data;

    let board;

    try {
       board =  await db.board.update({
            where : {
                id,
                orgId
            },
            data : {
                title
            }
         });

         

     await createAuditLog({
        entityId : board.id,
        entityType : ENTITY_TYPE.BOARD,
        entityTitle : board.title,
        action : ACTION.UPDATE
     });

    } catch (error) {
        return {
            error : "Failed to update board"
        }
    }

    revalidatePath(`/board/${id}`);
    return {data : board}
}

export const updateBoard = createSafeAction(UpdateBoard, handler);