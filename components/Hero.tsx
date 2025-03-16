import { heroData } from "@/lib/data"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">{heroData.title}</h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">{heroData.subtitle}</p>
        <Link
          href={heroData.ctaLink}
          className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 inline-block mb-12"
        >
          {heroData.ctaText}
        </Link>
        
        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-auto"
            >
              <source 
                src={process.env.NEXT_PUBLIC_CLOUDINARY_DEMO_VIDEO_URL} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}