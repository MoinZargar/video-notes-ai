import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../provider";
import React from "react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'NotesAI - Convert YouTube Videos & PDF to Study Notes',
    template: '%s | NotesAI',
  },
  description: 'Convert YouTube video lectures and PDF documents (handwritten & typed) into comprehensive study notes instantly with AIforNotes.',
  keywords: 'NotesAI, AI Notes, AI Note Taker, Note Taker AI, AI Note Taker for Youtube videos, AI Note Taker for PDFs, AI generated study notes, AI Generated study notes, Video to notes , YouTube to notes, video to notes converter, PDF to notes, AI study assistant',
  metadataBase: new URL('https://aifornotes.com'),
  alternates: {
    canonical: 'https://aifornotes.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://aifornotes.com',
    title: 'NotesAI - Convert YouTube Videos & PDF to Study Notes',
    description: 'Transform YouTube videos and PDF documents into comprehensive study notes.',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'NotesAI - YouTube Video & PDF to Study Notes Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NotesAI - Convert YouTube Videos & PDF to Study Notes',
    description: 'Transform YouTube videos and PDF documents into comprehensive study notes.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-H5RMPRQP7W"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-H5RMPRQP7W');
            `}
        </Script>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="index,follow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
