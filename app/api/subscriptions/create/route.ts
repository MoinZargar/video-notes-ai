import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';
import db from "@/lib/prisma"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const { planId } = await req.json();

  try {
    const session=await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const userId = Number(session?.user?.id)
    // Get plan details
    const plan = await db.plan.findUnique({
      where: { planId: planId },
    });

    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    let paymentUrl=""
    const subscription = await db.$transaction(async (tx)=>{
      const subscription = await razorpay.subscriptions.create({
        plan_id: plan.planId,
        customer_notify: 1,
        total_count: 1200,
        notes: { userId: userId }
      });
     
      const startDate = subscription.start_at ? new Date(subscription.start_at * 1000) : new Date();
      const endDate = subscription.end_at ? new Date(subscription.end_at * 1000) : null;
      paymentUrl=subscription.short_url
      // Create subscription record
      await tx.subscription.update({
        where: {
          userId: userId
        },
        data: {
          planId: plan.id,
          customerId: subscription.id,
          status: subscription.status,
          startDate: startDate,
          endDate: endDate
        }
      });
    })
    return NextResponse.json({
      paymentUrl:paymentUrl,
      amount: plan.price,
    });
  } catch (err: any) {
    console.log(err.stack)
    return NextResponse.json({ error: err?.error?.description || "Something went wront creating subscription" }, { status: 400 });
  }
}