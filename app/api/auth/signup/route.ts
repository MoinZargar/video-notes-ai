import { NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { signUpSchema } from '@/lib/schemas/authSchema';
import bcrypt from 'bcrypt';
import { Provider } from '@prisma/client';
import { SignUpFormData } from '@/types/forms';


export async function POST(req: Request) {
  try {
    const body:SignUpFormData = await req.json();
    const validatedData = signUpSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }
    const {name, email, password} = validatedData.data; 
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
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        provider:Provider.CREDENTIALS
      }
    });

    return NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
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
