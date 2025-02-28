
import { videoNotesModel } from "@/lib/config/videoNotesAI";
import { fileManager, pdfNotesModel } from "./config/pdfNotesAI";


export const generateVideoNotes = async (transcript: string[] | undefined):Promise<string>  => {
    try {
        const input = transcript ? transcript : ""
        const result = await videoNotesModel.generateContent(input);
        const notes = result.response.text();
        if (!notes) {
            throw new Error("Something went wrong while generating notes")
        }
        return notes;
    } catch (error: any) {
        console.log("error ",error.stack)
        console.log(error.errorDetails[1]?.message)
        throw new Error("Something went wrong while processing video")
    }
}

export const generateNotesFromPDF= async (fileUrl: string):Promise<string>  => {
    try {

        const pdfResp = await fetch(fileUrl)
            .then((response) => response.arrayBuffer());

            const result = await pdfNotesModel.generateContent([
                {
                    inlineData: {
                        data: Buffer.from(pdfResp).toString("base64"),
                        mimeType: "application/pdf",
                    },
                },
                'Please generate notes from the given pdf file according to the system instruction',
            ]);
            const notes = result.response.text();
            return notes;

    } catch (error: any) {
        console.log("error", error.stack)
        throw new Error("Something went wrong while processing pdf")
    }
}
