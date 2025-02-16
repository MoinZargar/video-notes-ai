import path from "path";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function uploadPdf(pdfFile: File, course: string) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
    
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
        }
    
        // Generate unique filename
        const timestamp = Date.now()
        const filename = `${course}-${userId}-${timestamp}.pdf`
        const filepath = path.join(uploadsDir, filename)
    
        // Read file and write to local filesystem
        const fileBuffer = await pdfFile.arrayBuffer()
        fs.writeFileSync(filepath, Buffer.from(fileBuffer))

        return {
            success: true,
            filename,
            filepath
        }
    } catch (error) {
         throw new Error("Failed to upload PDF file")
    }
}

