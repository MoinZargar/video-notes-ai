import { featuresData } from "@/lib/data"
import { BrainCircuit, FolderKanban, FileType, MessageSquareMore } from "lucide-react"

const iconMap = {
  BrainCircuit,
  FolderKanban,
  FileType,
  MessageSquareMore,
}

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-purple-600 mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

