# Notes AI

This tool has three main features:
- It converts YouTube educational content into well-structured, downloadable notes.
- It converts typed/handwritten PDFs into well-structured, downloadable notes.
- It features an AI-powered tutor to aid in understanding the content and resolving doubts.

## Installation

### Prerequisites

- Docker
- Git

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/MoinZargar/video-notes-ai.git
cd video-notes-ai
```

2. Create `.env.development` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://user:password@db:5432/mydatabase?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any-random-string
GEMINI_VIDEO_NOTES_API_KEY=get-it-from-google-ai-studio
GEMINI_CHAT_API_KEY=get-it-from-google-ai-studio

# OAuth Configuration (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-google-client-secret
GEMINI_PDF_NOTES_API_KEY=get-it-from-google-ai-studio
```

> **Note**: The project uses three different Gemini API keys - one for video notes generation, one for the chatbot, and one for generating notes from PDFs. If you wish, you can use a single key for all three purposes.

### 🏃‍♂️ Running the Application

1. Start the application:
```bash
docker-compose up --build
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. To stop the application:
```bash
docker-compose down
```

4. To visualize the database, run the following command in your terminal:
```bash
docker-compose exec app npx prisma studio
```
Then, navigate to `http://localhost:5555` in your web browser to view the database.


## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Containerization**: Docker

## 🤝 Contributing

Feel free to contribute to this project by creating issues or submitting pull requests.

