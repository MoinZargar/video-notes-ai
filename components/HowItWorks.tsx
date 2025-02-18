import { howItWorksData } from "@/lib/data"
import { Youtube, FileText, Download, HelpCircle, Upload } from "lucide-react"

const iconMap = {
  Youtube,
  FileText,
  Download,
  HelpCircle,
  Upload,
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksData.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap]
            return (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                <div className="text-purple-600 mb-4 flex justify-center">
                  <Icon size={48} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}