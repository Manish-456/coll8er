import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    { params } : {
        params : {
            cardId : string
        }
    }
){
    try {
        const {userId, orgId} = auth();

        if(!orgId || !userId) return new NextResponse("Unauthorized", { status : 401 });

        const {cardId} = params;

      const logs = await db.auditLog.findMany({
            where : {
                orgId,
                entityType : ENTITY_TYPE.CARD,
                entityId : cardId
            },
            orderBy : {
                createdAt : 'desc'
            },
            take : 3
        });

        return NextResponse.json(logs);

    } catch (error) {
        return new NextResponse("Internal error", {
            status : 500
        })
    }
}