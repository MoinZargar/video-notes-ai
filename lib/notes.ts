
import { videoNotesModel } from "@/lib/config/videoNotesAI";
import { fileManager, pdfNotesModel } from "./config/pdfNotesAI";


export const generateVideoNotes = async (transcript: string[] | undefined) => {
    try {
        const input = transcript ? transcript : ""
        const result = await videoNotesModel.generateContent(input);
        const notes = result.response.text();
        if (!notes) {
            throw new Error("Something went wrong while generating notes")
        }
        return notes;
    } catch (error: any) {
        throw new Error(error.errorDetails[1]?.message)
    }
}

export const generateNotesFromPDF = async (filename: string, path: string) => {
    try {
        const uploadResult = await fileManager.uploadFile(
            path,
            {
                mimeType: "application/pdf",
                displayName: filename,
            },
        );

        const result = await pdfNotesModel.generateContent([
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                },
            },
            'Please follow the instructions provided in the system instruction and generate the notes'
        ]);
        await fileManager.deleteFile(uploadResult.file.name);
        const notes = result.response.text();
        return notes;

    } catch (error: any) {
        console.log("error", error)
        throw new Error(error.errorDetails[1]?.message || "Something went wrong while generating notes")
    }
}
