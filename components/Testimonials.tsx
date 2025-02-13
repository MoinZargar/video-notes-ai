import { testimonialData } from "@/lib/data"
import Image from "next/image"

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4 text-sm md:text-base">&quot;{testimonial.content}&quot;</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-xs md:text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

