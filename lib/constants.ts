export const options = {
  method: 'POST',
  url: process.env.TRANSCRIBE_API_URL,
  headers: {
    'x-rapidapi-key': process.env.TRANSCRIBE_API_KEY,
    'x-rapidapi-host': process.env.TRANSCRIBE_API_HOST,
    'Content-Type': 'application/json'
  },
}
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
6. Format mathematical formulas using "formula" tags.
7. Format code examples using "code" tags.
8. Clearly delineate topics and subtopics with proper headings.
9. Explain concepts with examples and use cases when provided in the transcript.
10. Break down complex topics into digestible sections while maintaining technical accuracy.
11. Do not include any introductory text or meta-commentary.

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

export const transcript = `One of the fundamental concepts in mathematics is the Fibonacci sequence, a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1. The sequence goes like 0, 1, 1, 2, 3, 5, 8, 13, and so on. Mathematically, it is defined as F(n) = F(n-1) + F(n-2) for n ≥ 2, with base cases F(0) = 0 and F(1) = 1. This sequence appears in nature, such as the arrangement of leaves on a stem, the branching of trees, and the spiral patterns of shells. The Fibonacci sequence is also closely related to the golden ratio, where the ratio of successive terms approaches approximately 1.618 as n increases.

A well-known mathematical application of the Fibonacci sequence is in Pascal’s Triangle, where the sum of certain diagonals corresponds to Fibonacci numbers. Another interesting property is its connection with the golden ratio φ, which is given by φ = (1 + √5) / 2. The nth Fibonacci number can be approximated using Binet’s formula: F(n) = (φ^n - (1-φ)^n) / √5. This formula provides a direct way to compute Fibonacci numbers without recursion. The Fibonacci sequence also has applications in computer algorithms, financial markets, and even art and music, making it a fascinating topic with both theoretical and practical significance.`;
