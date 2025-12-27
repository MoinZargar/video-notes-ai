import db from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SubscriptionStatus } from '@prisma/client';

type usageType = 'video' | 'pdf' | 'chat'

export async function checkUsage(usageType: usageType) {
    const session = await getServerSession(authOptions)
    try {
        // 1. Authenticate the user
        if (!session?.user) {
            return { allowed: false, message: "Unauthorized request" }
        }

        const userId = Number(session.user.id)

        // 2. Check if user has active subscription
        const subscription = await db.subscription.findUnique({
            where: { userId }
        })

        if (!subscription) {
            return { allowed: false, message: "No subscription found" }
        }

        // 3. If user has active subscription, allow unlimited usage
        if (subscription.status === SubscriptionStatus.active) {
            // Increment usage count
            await db.dailyUsage.update({
                where: {
                    subscriptionId: subscription?.id
                },
                data: {
                    [`${usageType}Count`]: {
                        increment: 1
                    }
                }
            })
            return { allowed: true, message: "Unlimited usage with premium monthly subscription" }
        }

        // 4. Get user's usage record - should exist from signup
        const usageRecord = await db.dailyUsage.findFirst({
            where: {
                subscriptionId: subscription.id
            }
        })
        if (!usageRecord) {

            const newUsage = await db.dailyUsage.create({
                data: {
                    subscriptionId: subscription.id,
                    date: new Date(),
                    videoCount: 0,
                    pdfCount: 0,
                    chatCount: 0
                }
            })
        }
        // 5. Check if 24 hours have elapsed since last reset
        const currentTime = new Date()
        const lastResetTime = usageRecord ? new Date(usageRecord?.date) : new Date()
        const hoursDifference = (currentTime.getTime() - lastResetTime.getTime()) / (1000 * 60 * 60)

        // 5. If 24+ hours have passed, reset counters
        if (hoursDifference >= 24) {
            await db.dailyUsage.update({
                where: { id: usageRecord?.id },
                data: {
                    date: currentTime,
                    videoCount: 0,
                    pdfCount: 0,
                    chatCount: 0
                }
            })
        }
        else {
            // 7. Otherwise, check current usage count
            let currentCount = 0
            if (usageType === 'video') currentCount = usageRecord?.videoCount || 0
            else if (usageType === 'pdf') currentCount = usageRecord?.pdfCount || 0
            else currentCount = usageRecord?.chatCount || 0

            // 8. If limit reached, deny access
            if (currentCount >= 6) {
                return {
                    allowed: false,
                    message: `You have reached your daily limit for ${usageType}. Please try again in ${Math.ceil(24 - hoursDifference)} hours`
                }
            }
        }
        // 9. Increment usage count
        await db.dailyUsage.update({
            where: {
                id: usageRecord?.id
            },
            data: {
                [`${usageType}Count`]: {
                    increment: 1
                }
            }
        })
        return {
            allowed: true,
            message: `${usageType} access granted.`
        }
    } catch (error) {
        throw (error)
    }
    finally {
        console.log("User ", session?.user?.email)
    }
}
