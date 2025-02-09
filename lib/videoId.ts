export const getYouTubeVideoId = (url: string): string => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
    const match = url.match(regex)
    return match ? match[1] : ""
}