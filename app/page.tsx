
import { Metadata } from 'next'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'AIforNotes - Convert YouTube Videos & PDF to Study Notes',
  description: 'Convert YouTube video lectures and PDF documents (handwritten & typed) into comprehensive study notes instantly with AIforNotes. Our AI-powered platform creates detailed notes, summaries, and study materials from educational content. Get smart concept explanations and personalized tutoring support.',
  keywords: 'YouTube to notes, video to notes converter, PDF to notes, handwritten notes converter, lecture notes generator, AI notes maker, YouTube lecture notes, online study notes, video summarizer, educational video notes, AI study assistant, YouTube summary tool, study material generator, video lecture summary, academic notes creator, PDF document summary',
  metadataBase: new URL('https://aifornotes.com'),
  openGraph: {
    title: 'AIforNotes - YouTube Video & PDF to Study Notes Converter',
    description: 'Transform YouTube videos and PDF documents into comprehensive study notes. AI-powered note generation, summaries, and concept explanations for better learning.',
    url: 'https://aifornotes.com',
    type: 'website',
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
