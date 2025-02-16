import { PdfNotesFormData } from "@/types/forms";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { pdfNotesSchema } from "@/lib/schemas/pdfNotesSchema";
import path from "path";
import fs from "fs";
import { uploadPdf } from "@/lib/uploadPdf";

export async function POST(req: Request) {
    try {

        const formData = await req.formData();
        const pdfFile = formData.get("pdfFile") as File;
        const course = formData.get("course") as string;

        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const validatedFields = pdfNotesSchema.safeParse({pdfFile, course});
        if (!validatedFields.success) {
            return NextResponse.json({ error: "Invalid fields" }, { status: 400 })
        }
        const uploadedPdf = await uploadPdf(pdfFile, course)
        if (!uploadedPdf.success) {
            return NextResponse.json({ error: "Failed to upload PDF file" }, { status: 500 })
        }
         
        return NextResponse.json({ message: "File uploaded successfully" }, { status: 200 })

    } catch (error:any) {
        console.log(error.message )
        return NextResponse.json({ error:error?.message || "Internal server error" }, { status: 500 })
    }
}
