
import { Metadata } from 'next'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'AI Notes - AI Note Taker for Youtube videos and PDF',
  description: 'Convert YouTube video lectures and PDF documents (handwritten & typed) into comprehensive study notes instantly with AIforNotes. Our AI-powered platform creates detailed notes, summaries, and study materials from educational content. Get smart concept explanations and personalized tutoring support.',
  keywords: 'AI Notes, AI Note Taker, Note Taker AI, AI Note Taker for Youtube videos, AI Note Taker for PDFs, AI generated study notes, AI For Notes, YouTube to notes, video to notes converter, PDF to notes, handwritten notes converter, lecture notes generator, AI notes maker, YouTube lecture notes, online study notes, video summarizer, educational video notes, AI study assistant, YouTube summary tool, study material generator, video lecture summary, academic notes creator, PDF document summary',
  metadataBase: new URL('https://aifornotes.com'),
  alternates: {
    canonical: 'https://aifornotes.com',
  },
  openGraph: {
    title: 'AI Notes - YouTube Videos to Study Notes Converter',
    description: 'Transform YouTube videos and PDF documents into comprehensive study notes. AI-powered note generation, summaries, and concept explanations for better learning.',
    url: 'https://aifornotes.com',
    type: 'website',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'AI for Notes - YouTube Video & PDF to Study Notes Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Notes - YouTube Videos to Study Notes Converter',
    description: 'Transform YouTube videos and PDF documents into comprehensive study notes with AI.',
    images: ['/og_image.png'], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
