"use server";
import {revalidatePath} from "next/cache";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async(data : InputType) : Promise<ReturnType> => {
  const {userId, orgId} = auth();
  if(!userId) {
    return {
      error : "Unauthorized"
    }
  };

  const {title, image} = data;

  const canCreate = await hasAvailableCount();

  const isPro = await checkSubscription();

  if(!canCreate && !isPro){
    return {
      error : "You have reached your limit of free boards. Please upgrade to create more."
    }
  }

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|");

  if(!imageId || !imageFullUrl || !imageThumbUrl || !imageUserName || !imageLinkHTML){
    return {
      error : "Missing fields. Failed to create board."
    }
  }

  let board;
  try {
    board = await db.board.create({
      data : {
        title,
        orgId : orgId as string,
        imageId,
        imageFullUrl,
        imageLinkHTML,
        imageThumbUrl,
        imageUserName
      }
    });

    if(!isPro){
      await incrementAvailableCount();
    }

    await createAuditLog({
      entityId : board.id,
      entityType : ENTITY_TYPE.BOARD,
      entityTitle : board.title,
      action : ACTION.CREATE
   });
   
  } catch (error) {
    return {
      error : "Failed to create"
    }
  }

  revalidatePath(`/board/${board.id}`)
  return {data : board}
}

export const createBoard = createSafeAction(CreateBoard, handler);