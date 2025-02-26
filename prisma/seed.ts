import db from "@/lib/prisma"
import { PlanType } from "@prisma/client"

async function main() {
  // Basic Plan
  await db.plan.upsert({
    where: { name: PlanType.BASIC },
    update: {},
    create: {
      name: PlanType.BASIC,
      price: 0,
      planId: process.env.BASIC_PLAN_ID!,
    }
  });
  // Monthly Plan
  await db.plan.upsert({
    where: { name: PlanType.MONTLY },
    update: {},
    create: {
      name: PlanType.MONTLY,
      price: 250,
      planId: process.env.RAZORPAY_MONTHLY_PLAN_ID!,
    }
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });