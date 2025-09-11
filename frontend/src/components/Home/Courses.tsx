import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const Courses = () => {
  const features = [
    {
      name: "📚 Course Interaktif",
      description: "Belajar dengan materi interaktif dan mudah dipahami.",
      imageSrc: "https://images.unsplash.com/photo-1754835143820-bcf20e2e1a35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Course interaktif",
      href: "#",
    },
    {
      name: "📝 Ujian Online",
      description: "Kerjakan ujian dengan sistem terintegrasi.",
      imageSrc: "https://images.unsplash.com/photo-1754835143820-bcf20e2e1a35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Ujian online",
      href: "#",
    },
    {
      name: "🎓 Sertifikat",
      description: "Dapatkan sertifikat setelah menyelesaikan course.",
      imageSrc: "https://images.unsplash.com/photo-1754835143820-bcf20e2e1a35?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Sertifikat",
      href: "#",
    },
  ]

  return (
    <div className="bg-gray-900" id="courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Fitur Utama
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden rounded-xl shadow-md py-0 pb-0">
                  <CardHeader className="p-0">
                    <img
                      alt={item.imageAlt}
                      src={item.imageSrc}
                      className="w-full h-48 sm:h-60 lg:h-64 object-cover rounded-t-xl group-hover:opacity-80 transition"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-sm text-gray-500">
                      <a href={item.href} className="hover:underline">
                        <span className="absolute inset-0" />
                        {item.name}
                      </a>
                    </h3>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
