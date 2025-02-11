import { AIChatFormData } from "@/types/forms";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { chatBot } from "@/lib/chat";
import { ChatRequestBody } from "@/types/chat";


export async function POST(req: NextRequest) {
   try {
     const body: ChatRequestBody = await req.json();
     const { message , history } = body;
     const session = await getServerSession(authOptions)
     if (!session) {
         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
     const response = await chatBot(message, history)
     if (!response) {
         return NextResponse.json({ error: "Something went wrong while generating response" }, { status: 500 });
     }
 
     return NextResponse.json({ response }, { status: 200 });
   } catch (error: any) {
     throw new Error(error?.message || "Something went wrong while generating response")
    
   }
    
}
