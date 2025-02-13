export const getYouTubeVideoId = (input: string): string => {
    const regExp: RegExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:.*[?&]v=|(?:v|e(?:mbed)?)\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match: RegExpMatchArray | null = input.match(regExp);
  
    return match && match[1] ? match[1] : input;
};