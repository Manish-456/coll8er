import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const DAY_IN_MS = 86_400_000

export async function checkSubscription(){
    const {orgId} = auth();

    if(!orgId) return false;

    const orgSubscription = await db.orgSubscription.findUnique({
        where : {
            orgId
        },
        select : {
            stripeCurrentPeriodEnd : true,
            stripePriceId : true,
            stripeCustomerId : true,
            stripeSubscriptionId : true
        }
    })

    if(!orgSubscription) return false;

    const isValid = orgSubscription.stripePriceId && 
                    orgSubscription?.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
    
    return !!isValid;
}