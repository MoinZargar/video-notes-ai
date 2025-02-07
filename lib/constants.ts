export const options = {
    method: 'POST',
    url: process.env.TRANSCRIBE_API_URL,
    headers: {
      'x-rapidapi-key': process.env.TRANSCRIBE_API_KEY,
      'x-rapidapi-host': process.env.TRANSCRIBE_API_HOST,
      'Content-Type': 'application/json'
    },
}