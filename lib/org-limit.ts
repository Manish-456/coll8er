import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { MAX_FREE_BOARD_TIER } from "@/constants/boards";

export const incrementAvailableCount = async() => {
    const {userId, orgId} = auth();

    if(!orgId || !userId){
        throw new Error("Unauthorized");
    }

    const orgLimit = await db.orgLimit.findUnique({
        where : {
            orgId
        }
    });

    if(orgLimit){
        await db.orgLimit.update({
            where : {
                id : orgLimit.id,
                orgId
            }, 
            data : {
                count : orgLimit.count + 1
            }
        })
    }else{
        await db.orgLimit.create({
            data : {
                orgId,
                count : 1
            }
        })
    }
}

export const decrementAvailableCount = async() => {
    const {userId, orgId} = auth();

    if(!orgId || !userId){
        throw new Error("Unauthorized");
    }

    const orgLimit = await db.orgLimit.findUnique({
        where : {
            orgId
        }
    });

    if(orgLimit){
        await db.orgLimit.update({
            where : {
                id : orgLimit.id,
                orgId
            }, 
            data : {
                count : orgLimit.count > 0 ? orgLimit.count - 1 : 0 
            }
        })
    }else{
        await db.orgLimit.create({
            data : {
                orgId,
                count : 1
            }
        })
    }
}

export const hasAvailableCount = async() => {
    const {userId, orgId} = auth();

    if(!orgId || !userId){
        throw new Error("Unauthorized");
    }

    const orgLimit = await db.orgLimit.findUnique({
        where : {
            orgId
        }
    })

    if(!orgLimit || orgLimit.count < MAX_FREE_BOARD_TIER){
        return true;
    }
    return false;
}

export const getAvailableCount = async() => {
    const {orgId} = auth();

    if(!orgId){
        return 0;
    }

    const orgLimit = await db.orgLimit.findUnique({
        where : {
            orgId
        }
    });

    if(!orgLimit) return 0;

    return orgLimit.count;
}