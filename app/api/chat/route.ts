import { AIChatFormData } from "@/types/forms";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { chatBot } from "@/lib/chat";
import { ChatRequestBody } from "@/types/chat";
import { checkUsage } from "@/app/actions/checkUsage";


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const body: ChatRequestBody = await req.json();
    const { message, history } = body;
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const dailyUsage = await checkUsage('chat')
    if (!dailyUsage.allowed) {
      return NextResponse.json({ error : dailyUsage.message }, { status: 402 })
    }
    
    const response = await chatBot(message, history)
    if (!response) {
      return NextResponse.json({ error: "Something went wrong while generating response" }, { status: 500 });
    }
  
    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong while generating response")

  }
  finally {
    console.log("user ", session?.user?.email)
  }

}
