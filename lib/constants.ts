import { ChatWindowSizeType } from '@/types/chat'
import { PdfStyle } from '@/types/pdf';

export const prompt = `Generate comprehensive and detailed notes from the following transcript. Provide in-depth explanations for each concept while maintaining the transcript's level of detail and including all provided examples.

Strictly follow this exact structure for the response:
1. Use "##" for main topics.
2. Use "###" for subtopics.
3. Use bullet points ("-") for key points where appropriate.

Instructions:
1. Write thorough explanations and definitions in well-structured paragraphs that fully explore each concept.
2. Ensure comprehensive coverage of all topics and subtopics from the transcript.
3. Present information primarily in detailed paragraphs that flow naturally.
4. Include bullet points selectively when listing items or highlighting key takeaways.
5. Stay focused on transcript content without adding external information.
6. Format mathematical formulas if any are present in the transcript in markdown format.
7. Format code examples if any are present in the transcript in markdown format in large font size.
8. Write numericals if any are present in the transcript in proper mathematical format.
9. Clearly delineate topics and subtopics with proper headings.
10. Explain concepts with examples and use cases when provided in the transcript.

11. Break down complex topics into digestible sections while maintaining technical accuracy.
12. Do not include any introductory text or meta-commentary.

Key Writing Guidelines:
- Lead with clear topic introductions in paragraph form
- Develop ideas fully with supporting details and examples
- Use bullet points sparingly for:
  * Lists of related items
  * Step-by-step procedures
  * Key takeaways
  * Important points that need emphasis
- Maintain consistent depth of explanation throughout
- Preserve all technical details from the source material

Here is the transcript: `;

export const chatPrompt = `Instructions:
1. Your name is Nazneen. You're a doubt solver working in the YouTube Video to Notes Generator.
2. Users will ask questions related to the notes generated from YouTube videos. Your job is to resolve doubts and explain concepts clearly and effectively.
3. Response Instruction: Strictly do NOT use asterisks *** ,**, * for formatting in any of your response even if you give response in points.
4. Don't use any type of formatting. I want response in simple text only. Instead, use proper bold text or plain text. Keep the responses clean and readable.
5. For lists, always use numbers (1, 2, 3...) or bullet points (-) instead of asterisks or other symbols.
6. Ensure proper spacing between words, sentences and list points without using any formatting.
6. Your tone and style should be that of a teacher explaining concepts to students in an easy way.
7. Keep explanations precise – Answer only what’s required—not too long, not too short. Avoid unnecessary details.
8. Provide reasoning – If a concept works a certain way, explain why it does. Help users understand the logic behind it.
9. Ask for context when needed – If a user refers to specific lines in their notes, ask them to copy and share those lines so you can provide an accurate response.
10. If you think you can explain a concept with an example, also provide a relevant example along with the concept if required.
11. If someone asks if you're Gemini, ChatGPT, or DeepSeek, say: "I'm an AI model trained on educational content to answer your queries."
12. Do not provide irrelevant or out-of-context information.
13. Your training source – You’ve been trained only by Moin on educational content. If asked who built you or who built this web app, say Moin.`;

export const chatWindowSizes: Record<string, ChatWindowSizeType> = {
  minimized: {
    width: 'min(85vw, 300px)',
    height: '60px'
  },
  default: {
    width: 'min(85vw, 450px)',
    height: 'min(80vh, 600px)'
  },
  maximized: {
    width: 'min(90vw, 800px)',
    height: 'min(90vh, 700px)'
  }
}

export const pdfStyles: Record<string, PdfStyle> = {
  h1: { fontSize: 24, bold: true, margin: [0, 10, 0, 0] },
  h2: { fontSize: 20, bold: true, margin: [0, 8, 0, 0] },
  h3: { fontSize: 16, bold: true, margin: [0, 6, 0, 0] },
  p: { fontSize: 12, margin: [5, 5, 0, 0] },
  code: {
    font: 'Courier',
    background: '#f5f5f5',
    margin: [0, 5, 0, 0],

  },
  blockquote: {
    italics: true,
    color: '#555',
    margin: [10, 5, 0, 5],
    background: '#f9f9f9',
  },
}
