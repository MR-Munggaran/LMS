import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const Courses = () => {
  const features = [
    {
      name: "📚 Course Interaktif",
      description: "Belajar dengan materi interaktif dan mudah dipahami.",
      imageSrc:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1200&auto=format&fit=crop",
      imageAlt: "Course interaktif",
      href: "#",
    },
    {
      name: "📝 Ujian Online",
      description: "Kerjakan ujian dengan sistem terintegrasi.",
      imageSrc:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Ujian online",
      href: "#",
    },
    {
      name: "🎓 Sertifikat",
      description: "Dapatkan sertifikat setelah menyelesaikan course.",
      imageSrc:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "Sertifikat",
      href: "#",
    },
  ]

  return (
    <section
      id="courses"
      className="relative bg-gradient-to-br from-[#E4004B] via-[#ED775A] to-[#FAD691] py-20"
    >
      {/* Overlay biar teks lebih jelas */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl drop-shadow-lg">
            Fitur Utama
          </h2>
          <p className="mt-4 text-lg text-[#C9CDCF]">
            Semua yang kamu butuhkan untuk pengalaman belajar terbaik 🚀
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 py-1">
                <CardHeader className="p-0 relative">
                  <img
                    alt={item.imageAlt}
                    src={item.imageSrc}
                    className="w-full h-48 sm:h-60 lg:h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#FAD691] transition-colors">
                    <a href={item.href} className="relative z-10">
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-3 text-sm text-[#C9CDCF]">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Courses
