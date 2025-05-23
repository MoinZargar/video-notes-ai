import { NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { signUpSchema } from '@/lib/schemas/authSchema';
import bcrypt from 'bcrypt';
import { Provider, User } from '@prisma/client';
import { SignUpFormData } from '@/types/forms';


export async function POST(req: Request) {
  try {
    const body: SignUpFormData = await req.json();
    const validatedData = signUpSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }
    const { name, email, password, captchaToken } = validatedData.data;

    // verify captcha token
    const res = await fetch(process.env.CLOUDFLARE_VERIFY_TOKEN_ENDPOINT!, {
      method: 'POST',
      body: `secret=${encodeURIComponent(process.env.CLOUDFLARE_SECRET_KEY!)}&response=${encodeURIComponent(captchaToken)}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    const verifyToken = await res.json()
    
    if (!verifyToken.success) {
      return NextResponse.json(
        { error: 'Invalid Captcha Token'},
        { status:400}
      )
    }
    const existingUser = await db.user.findUnique({
      where: { email: email }
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          provider: Provider.CREDENTIALS
        }
      });
  
      const plan = await db.plan.findUnique({
        where: { planId: process.env.NEXT_PUBLIC_BASIC_PLAN_ID! },
      });
      //initialize the susbscription and daily usage model
      const susbscription = await tx.subscription.create({
        data: {
          userId: user.id,
          planId: plan?.id || 1
        }
      })
      const dailyUsage = await tx.dailyUsage.create({
        data: {
          subscriptionId: susbscription.id
        }
      })
    })

    return NextResponse.json(
      {
        success: true,
        user: {
          email: email,
          name: name
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error.stack);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
