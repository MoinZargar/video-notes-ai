export const headerData = {
  logo: "NotesAI",
  menuItems: [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact us", href: "#contact" },
  ],
  authItems: [
    { name: "Signup", href: "/signup" },
    { name: "Signin", href: "/signin" },
  ],
}

export const heroData = {
  title: "Let AI Take Notes For You",
  subtitle: "Transform YouTube video lectures and PDF documents into detailed, organized notes with AI",
  ctaText: "Get Started",
  ctaLink: "/signup",
}

export const featuresData = [
  {
    title: "AI-Powered Note Generation",
    description: "Transform YouTube video lectures and PDF documents into detailed, structured notes",
    icon: "BrainCircuit",
  },
  {
    title: "Course Organization",
    description: "Create and manage multiple courses with ease.",
    icon: "FolderKanban",
  },
  {
    title: "PDF Export",
    description: "Download your notes as PDF for offline access and easy sharing.",
    icon: "FileType",
  },
  {
    title: "AI Chatbot Assistance",
    description: "Get instant help and in-depth explanations from our integrated AI chatbot.",
    icon: "MessageSquareMore",
  },
]

export const howItWorksData = [
  {
    step: 1,
    title: "Add Learning Material",
    description: "Upload a PDF document or paste the URL of the YouTube video lecture you want to study.",
    icon: "Upload",
  },
  {
    step: 2,
    title: "Generate AI Notes",
    description: "Our AI system creates detailed, structured notes from your video or PDF content.",
    icon: "FileText",
  },
  {
    step: 3,
    title: "Download Notes",
    description: "Access your AI-generated notes and download them as PDF for offline study.",
    icon: "Download",
  },
  {
    step: 4,
    title: "Ask Doubts",
    description: "Use our AI chatbot to clarify doubts and get in-depth explanations.",
    icon: "HelpCircle",
  },
]

export const plansData= [
  {
      name: 'Basic',
      price: 0,
      features: [
          '2 AI Chats per day',
          '2 PDF Uploads per day',
          '2 YouTube Video Processing per day'
      ]
  },
  {
      name: 'Monthly',
      price: 250,
      features: [
          'Unlimited AI Chats',
          'Unlimited PDF Uploads (up to 15MB each)',
          'Unlimited YouTube Video Processing'
      ],
      isPopular: true
  }
];

export const faqData = [
  {
    question: "What is AI Note Taker?",
    answer:
      "AI Note Taker is an intelligent system that automatically generates comprehensive notes from your educational content, making learning more efficient and organized.",
  },
  {
    question: "What is the accuracy of AI-generated notes from youtube video and PDF sources?",
    answer:
      "AI-generated notes from youtube video and PDF sources are highly accurate. Each concept discussed in the video lecture or PDF document is thoroughly explained in detail, ensuring comprehensive coverage.",
  },
  {
    question: "Can I use any YouTube video?",
    answer:
      "Yes, you can use any publicly available YouTube video. However, we cannot generate notes for private youtube videos.",
  },
  {
    question: "Can we also generate notes from our handwritten PDFs?",
    answer:
      "Yes, you can convert handwritten PDF files into AI-generated notes.",
  },
  {
    question: "How does the AI chatbot work?",
    answer:
      "Our AI chatbot uses advanced natural language processing to understand your questions and provide relevant answers based on the content of your notes and additional knowledge sources.",
  },
]
