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
          className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 inline-block"
        >
          {heroData.ctaText}
        </Link>
      </div>
    </section>
  )
}
