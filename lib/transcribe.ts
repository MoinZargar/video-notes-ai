import axios from "axios"
import { options } from "@/lib/constants";

export const transcribeVideo = async (videoUrl: string) => {
  
  
    try {
      const response = await axios.request(
        {
          ...options,
          data: {
            url: videoUrl
          }
        }
      );
      return response.data


    } catch (error:any) {
        throw new Error(error?.response?.data?.message || "Failed to transcribe video")
    }
}

