import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { pdfNotesSchema } from "@/lib/schemas/pdfNotesSchema";
import { uploadPdf } from "@/lib/uploadPdf";
import { generateNotesFromPDF } from "@/lib/notes";
import  db  from "@/lib/prisma";
import fs from "fs";

export async function POST(req: Request) {
    let uploadedPdf: any;
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
        uploadedPdf = await uploadPdf(pdfFile, course)
        if (!uploadedPdf.success) {
            return NextResponse.json({ error: "Failed to upload PDF file" }, { status: 500 })
        }
         
        const notes = await generateNotesFromPDF(uploadedPdf.filename , uploadedPdf.filepath)
        const courseData = await db.course.findUnique({
            where: {
                name: course,
            }
        })
        if (!courseData) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 })
        }
        const notesData = await db.notes.create({
            data: {
                content: notes,
                source: "pdf",
                userId: Number(session.user.id),    
                courseId: courseData?.id,
            }
        })
        // remove the pdf file from the server
        fs.unlinkSync(uploadedPdf.filepath)
        return NextResponse.json({ notes }, { status: 200 })

    } catch (error:any) {
        console.log(error.message )
        // remove the pdf file from the server
        fs.unlinkSync(uploadedPdf.filepath)
        return NextResponse.json({ error:error?.message || "Internal server error" }, { status: 500 })
    }
}
